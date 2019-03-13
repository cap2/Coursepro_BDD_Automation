<?php
/**
 * Data Generation Class File
 *
 * @category  CoreClass
 * @package   CoursePro
 * @author    Pete Walker <pete.walker@cap2.co.uk>
 * @copyright 2012 Cap2 Solutions Ltd
 * @license   http://www.cap2.co.uk/license/coursepro Commercial
 * @version   2.5.2
 * @link      http://www.cap2.co.uk
 */

use Symfony\Component\Yaml\Yaml;

/**
 * Upgrade Class
 * Contains all upgrading functionality
 *
 * @category CoreClass
 * @package  CoursePro
 * @author   Pete Walker <pete.walker@cap2.co.uk>
 * @license  http://www.cap2.co.uk/license/coursepro Commercial
 * @link     http://www.cap2.co.uk
 */

class Cap2_Projects_CoursePro_Generator
{

    // SELECT table_name FROM information_schema.tables
    // WHERE table_schema='coursepro' AND auto_increment IS NOT NULL;
    protected static $increment = array(
        'age_ranges',
        'alerts',
        'badges',
        'badge_supplier_orders',
        'badge_supplier_order_rows',
        'bank_account_validator_log',
        'book_restrictions',
        'bookable_area_split_sections',
        'bookable_areas',
        'centre_has_bookable_areas',
        'centre_has_courses',
        'centres',
        'class_cancel_reasons',
        'class_colours',
        'class_dates',
        'class_date_times',
        'class_has_members',
        //'class_member_movements',
        'class_name_definition_edits',
        'class_name_definition_edited_classes',
        'class_session_crm_changes',
        'class_sessions',
        'classes',
        'contact_triggers',
        'course_competencies',
        'course_competency_groups',
        'course_grade_grades',
        'course_grades',
        'course_groups',
        'course_has_class_name_definitions',
        'course_level_combinations',
        'course_level_groups',
        'course_levels',
        'course_plans',
        'course_plan_sessions',
        'courses',
        'custom_fields',
        'dev_mail',
        'disabilities',
        'direct_debit_metadata',
        'ethnicities',
        'error_log',
        'external_classes',
        'gateways',
        'homeportal_accounts',
        'homeportal_booking_choices',
        'homeportal_image_sets',
        'homeportal_image_set_has_images',
        'homeportal_login_tokens',
        'homeportal_topup_receipts',
        'homeportal_topup_transactions',
        'leaving_reasons',
        'marketing_sources',
        'medical_conditions',
        'member_contact_email',
        'member_contact_phone',
        'member_credit_history',
        'member_log',
        'member_notes',
        'member_payment_allocations',
        'members',
        'member_has_memberships',
        'membership_groups',
        'memberships',
        'node_edit_log',
        'online_payment_methods',
        'organisations',
        'organisation_groups',
        'organisation_group_contacts',
        'organisation_members',
        'organisation_types',
        'payment_plans',
        'payment_plan_options',
        'payment_plan_option_discounts',
        'portable_device_alerts',
        'portable_device_log',
        'portable_devices',
        'purchase_tokens',
        'purchase_token_types',
        'purchase_token_type_prices',
        'purchase_token_type_quantities',
        'qualifications',
        'receipts',
        'regions',
        'region_groups',
        'slots',
        'slot_organisation_member_movements',
        'slot_multiplied_log',
        'slot_sessions',
        'slot_session_has_members',
        'slot_teacher_groups',
        'slot_teacher_group_has_members',
        'slot_teacher_group_has_organisation_members',
        'staff',
        'staff_groups',
        'staff_messages',
        'titles',
        'triggers',
        'trigger_actions',
        'trigger_conditions',
        'trigger_templates',
        'transactions',
        'voucher_codes',
        'waiting_list',
        'waiting_list_contact'
    );

    function _c($setting)
    {
        return Cap2_Projects_CoursePro_Config::get($setting);
    }

    private static $_openIdentityTable = '';

    /**
     * Constructor
     *
     * @return void
     */
    function __construct()
    {
        global $db;


    }

    /**
     * This function is called by the Upgrade.php script if its setting up the
     * demo data.
     *
     * NOTE: To add steps to the Generate button add them to
     * web/js/generate.js and the json.php file
     *
     * @return bool
     */
    static function doAll()
    {
        self::startGeneration();
        self::generateRegionsAndCentres(2, 3);
        self::generateCourseGrades();
        self::generateCourses();

        $last = -1;
        do {
            $data = self::generateMembers(300);
            if ($data['total'] != $last) {
                $last = $data['total'];
            }
        } while ($data['total'] != $last);

        self::generateMedicalConditions();
        self::generateMemberMedicalConditions();
        self::generatePayment();
        self::generateMisc();
        self::generateStaff();
        self::generateClasses();
        self::generateClassMembers();
        self::generateAllocations();
        self::generateAssessment();
        self::generateTransactions();
        self::generateContactTriggers();
        self::generateWaitingList();
        self::generateHomeportal();
        self::generateSlots();
        self::generateTitles();
        self::generateConcessionaryTypes();
        self::tidyUpMembers();
    }

    // Start
    static function startGeneration()
    {
        global $db, $auth;

        $rec = $db->query(
            'SELECT login_key,password
            FROM staff
            WHERE staff_id=?',
            1
        );
        $info = $rec->fetchRow();

        $info['CAP2_SSO_CLIENT_ID'] = $db->query(
            'SELECT value
            FROM system
            WHERE setting = ?',
            "CAP2_SSO_CLIENT_ID"
        )->fetchRecord();
         if(!$info['CAP2_SSO_CLIENT_ID']){
            unset($info['CAP2_SSO_CLIENT_ID']);
        }

        $info['CAP2_SSO_SECRET'] = $db->query(
            'SELECT value
            FROM system
            WHERE setting = ?',
            "CAP2_SSO_SECRET"
        )->fetchRecord();
         if(!$info['CAP2_SSO_SECRET']){
            unset($info['CAP2_SSO_SECRET']);
        }

        $db->query(
            'DELETE FROM system
            WHERE setting=?',
            'version'
        );

        $up = new Cap2_Projects_CoursePro_Upgrade();
        $up->setVerbosity(0);
        $up->disableLock = true;
        $up->go('coursepro', true);

        $db->query(
            'UPDATE staff
            SET login_key=?,password=?
            WHERE staff_id=?',
            $info['login_key'],
            $info['password'],
            1
        );

        $session_id = $auth->getSessionId();
        $db->query(
            'INSERT INTO staff_sessions(
                session_id,staff_id,user_agent,ip_address,auth_token,last_action
            ) VALUES(?,?,?,?,?,?)',
            $session_id,
            1,
            isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '',
            isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '',
            null,
            date('Y-m-d H:i:s')
        );

        if($info['CAP2_SSO_CLIENT_ID'] && $info['CAP2_SSO_SECRET']){

            $db->insert(
                'system',
                array(
                    'setting' => 'CAP2_SSO_CLIENT_ID',
                    'value'   => $info['CAP2_SSO_CLIENT_ID']
                )
            );

            $db->insert(
                'system',
                array(
                    'setting' => 'CAP2_SSO_SECRET',
                    'value'   => $info['CAP2_SSO_SECRET']
                )
            );
        }

        return true;
    }

    // Regions / Centres
    static function generateRegionsAndCentres($regions, $centres)
    {
        global $db, $core;

        $override = array();
        if ($regions == 1) {
            $override = array(
                'centres' => array(
                    'region_id' => 1,
                ),
            );
        }

        $limits = array(
            'regions' => $regions,
            'centres' => $centres,
        );

        $skip = array();

        if ($regions == 2
            && $centres == 2
        ) {
            $skip = array(
                'centres' => 1,
            );
        }

        if (file_exists(_c('ROOT_PATH') . 'lib/generator/' . $core->getBridgeName() . '/regionsCentres.yml')) {
            self::importYaml(
                _c('ROOT_PATH') . 'lib/generator/' . $core->getBridgeName() . '/regionsCentres.yml',
                true,
                $limits,
                $override,
                $skip
            );
        } else {
            self::importYaml(
                _c('ROOT_PATH') . 'lib/generator/regionsCentres.yml',
                true,
                $limits,
                $override,
                $skip
            );
        }
    }

    // Grades
    static function generateCourseGrades()
    {
        global $db;

        self::importYaml(
            _c('ROOT_PATH') . 'lib/generator/grades.yml',
            true
        );
    }

    // Courses (includes course groups, levels, level groups)
    static function generateCourses()
    {
        global $db, $core;

        if (file_exists(_c('ROOT_PATH') . 'lib/generator/' . $core->getBridgeName() . '/courses.yml')) {
            self::importYaml(
                _c('ROOT_PATH') . 'lib/generator/' . $core->getBridgeName() . '/courses.yml',
                true
            );
        } else {
            self::importYaml(
                _c('ROOT_PATH') . 'lib/generator/courses.yml',
                true
            );
        }
    }

    // Members
    static function generateMembers($members)
    {
        global $db, $core;

        // Count how many are in the table
        // and then run the next YAML

        $rec = $db->query(
            'SELECT COUNT(*)
            FROM members'
        );

        $total = $rec->fetchRecord();

        $override = array(
            'members' => array(
                'date_of_birth' => function($date) {
                    if ($date === "1984-06-19") {
                        return $date;
                    }
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d');
                },
                'edit_date' => function($date) {
                    return date('Y-m-d H:i:s');
                },
            ),
        );

        if (_c('DEMO_NAMES')
            && file_exists(_c('DEMO_NAMES'))
        ) {
            $names = Yaml::parse(file_get_contents(_c('DEMO_NAMES')));
            $tmp = array();
            foreach ($names['replacements'] as $arr) {
                $tmp[$arr['member_id']] = $arr;
            }
            $names = $tmp;
            $override['current_id'] = 0;
            $override['members'] = array_merge(
                $override['members'],
                array(
                    'member_id' => function($id) use (&$override) {
                        $override['current_id'] = $id;
                        return $id;
                    },
                    'first_name' => function($name) use (&$override, $names) {
                        if (isset($names[$override['current_id']])
                            && isset($names[$override['current_id']]['first_name'])
                        ) {
                            return $names[$override['current_id']]['first_name'];
                        }
                        return $name;
                    },
                    'last_name' => function($name) use (&$override, $names) {
                        if (isset($names[$override['current_id']])
                            && isset($names[$override['current_id']]['last_name'])
                        ) {
                            return $names[$override['current_id']]['last_name'];
                        }
                        return $name;
                    },
                    'gender' => function($gender) use (&$override, $names) {
                        if (isset($names[$override['current_id']])
                            && isset($names[$override['current_id']]['gender'])
                        ) {
                            return $names[$override['current_id']]['gender'];
                        }
                        return $gender;
                    }
                )
            );
        }

        if ($total < $members) {
            $index = ($total / 50) + 1;
            self::importYaml(
                _c('ROOT_PATH') . 'lib/generator/' . $core->getBridgeName() . '/members_' . $index . '.yml',
                false,
                array(),
                $override
            );
            self::importYaml(
                _c('ROOT_PATH') . 'lib/generator/' . $core->getBridgeName() . '/member_cards_' . $index . '.yml',
                true
            );
            self::importYaml(
                _c('ROOT_PATH') . 'lib/generator/members/member_contact_email_' . $index . '.yml',
                true
            );
            self::importYaml(
                _c('ROOT_PATH') . 'lib/generator/members/member_contact_phone_' . $index . '.yml',
                true
            );
            $total += 50;
            if ($total < $members) {
                return array(
                    'total' => $total,
                    'done' => false,
                );
            }
        }
        return array(
            'done' => true,
        );
    }

    //Medical Conditions
    public static function generateMedicalConditions()
    {
        self::importYaml(
            _c('ROOT_PATH') . 'lib/generator/members/medical_conditions.yml'
        );
        return true;
    }

    //Member has medical conditions
    public static function generateMemberMedicalConditions()
    {
        self::importYaml(
            _c('ROOT_PATH') . 'lib/generator/members/member_has_medical_conditions.yml'
        );
        return true;
    }

    // Payment
    static function generatePayment($includeGatewayTestPlan = null)
    {
        $core = \Cap2_Projects_CoursePro_Core::singleton();

        $override = null;

        if((bool)$includeGatewayTestPlan) {
            $override = [
                'payment_plans' => [
                    'state' => 1, // Gateway Testing plan is deleted by default and can be loaded by setting all to live
                ],
            ];
        }

        self::importYaml(
            _c('ROOT_PATH') . 'lib/generator/' . $core->getBridgeName() . '/payment.yml',
            true,
            null,
            $override
        );
    }

    // Staff
    static function generateStaff()
    {
        global $db, $core;

        self::importYaml(
            _c('ROOT_PATH') . 'lib/generator/staff.yml',
            true
        );
    }

    // Classes
    static function generateClasses()
    {
        global $db, $core;

        $override = array(
            'class_dates' => array(
                'from' => function($date) {
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref);
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d', date('w') == 0 ? time() : strtotime('last sunday')));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d');
                },
                'to' => function($date) {
                    if (!$date) return $date;
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref);
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d', date('w') == 0 ? time() : strtotime('last sunday')));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d');
                },
            ),
        );

        $i = 1;
        while (file_exists(_c('ROOT_PATH') . 'lib/generator/classes_' . $i . '.yml')) {
            self::importYaml(
                _c('ROOT_PATH') . 'lib/generator/classes_' . $i . '.yml',
                false,
                array(),
                $override
            );
            $i += 1;
        }

        $override = array(
            'class_sessions' => array(
                'start' => function($date) {
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                },
                'end' => function($date) {
                    if (!$date) return $date;
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                },
            ),
        );

        $i = 1;
        while (file_exists(_c('ROOT_PATH') . 'lib/generator/classes/class_sessions_' . $i . '.yml')) {
            self::importYaml(
                _c('ROOT_PATH') . 'lib/generator/classes/class_sessions_' . $i . '.yml',
                false,
                array(),
                $override
            );
            $i++;
        }
    }

    // Slots
    static function generateSlots()
    {
        global $db, $core;

        $override = array(
            'slots' => array(
                'from_date' =>function($from_date) {
                    $ref = '2012-01-15';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($from_date)));
                    $d2 = new DateTime($from_date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($from_date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                },
                'to_date' => function($to_date) {
                    $ref = '2012-01-15';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($to_date)));
                    $d2 = new DateTime($to_date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($to_date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                },
            ),
            'slot_sessions' => array(
                'start_time' => function($from_date) {
                    $ref = '2012-01-15';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($from_date)));
                    $d2 = new DateTime($from_date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($from_date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                },
                'end_time'=> function($from_date) {
                    $ref = '2012-01-15';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($from_date)));
                    $d2 = new DateTime($from_date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($from_date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                },
            ),
        );

        self::importYaml(
            _c('ROOT_PATH') . 'lib/generator/slot.yml',
            false,
            array(),
            $override
        );
    }

    // Class members
    static function generateClassMembers()
    {
        global $db, $core;

        $override = array(
            'contact_trigger_log' => array(
                'date' => function($date) {
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                },
            ),
            'class_has_members_contact' => array(
                'contact_date' => function($date) {
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                }
            ),
            'class_member_movements' => array(
                'movement_date' => function($date) {
                    if (!$date) return $date;
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                },
                'date' => function($date) {
                    if (!$date) return $date;
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                }
            ),
        );

        self::importYaml(
            _c('ROOT_PATH') . 'lib/generator/class_members.yml',
            false,
            array(),
            $override
        );
    }

    // HomePortal
    static function generateHomeportal()
    {
        global $db, $core;

        self::importYaml(
            _c('ROOT_PATH') . 'lib/generator/homeportal.yml',
            false
        );
    }

    // Class members
    static function generateWaitingList()
    {
        global $db, $core;

        $override = array(
            'waiting_list' => array(
                'date_joined' => function($date) {
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                },
                'last_contact' => function($date) {
                    if (!$date) return $date;
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                },
            ),
            'waiting_list_contact' => array(
                'date' => function($date) {
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                }
            ),
        );

        self::importYaml(
            _c('ROOT_PATH') . 'lib/generator/waiting_list.yml',
            false,
            array(),
            $override
        );
    }

    // Class members
    static function generateAssessment()
    {
        global $db, $core;

        $override = array(
            'member_has_course_competencies' => array(
                'edit_date' => function($date) {
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                }
            ),
            'member_has_badges' => array(
                'achieve_date' => function($date) {
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                }
            ),
        );

        self::importYaml(
            _c('ROOT_PATH') . 'lib/generator/assessment.yml',
            false,
            array(),
            $override
        );
    }

    // Class members
    static function generateTransactions()
    {
        global $db, $core;

        $override = array(
            'transactions' => array(
                'date' => function($date) {
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                },
            ),
            'receipts' => array(
                'date' => function($date) {
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                },
            ),
        );

        if (file_exists(_c('ROOT_PATH') . 'lib/generator/' . $core->getBridgeName() . '/transactions.yml')) {
            self::importYaml(
                _c('ROOT_PATH') . 'lib/generator/' . $core->getBridgeName() . '/transactions.yml',
                false,
                array(),
                $override
            );
        } else {
            self::importYaml(
                _c('ROOT_PATH') . 'lib/generator/transactions.yml',
                false,
                array(),
                $override
            );
        }
    }

    // Allocations
    static function generateAllocations()
    {
        global $db, $core;

        $override = array(
            'member_payment_allocations' => array(
                'start_date' => function($date) {
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                },
                'end_date' => function($date) {
                    if (!$date) return $date;
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                },
            ),
        );

        if (file_exists(_c('ROOT_PATH') . 'lib/generator/' . $core->getBridgeName() . '/allocations.yml')) {
            self::importYaml(
                _c('ROOT_PATH') . 'lib/generator/' . $core->getBridgeName() . '/allocations.yml',
                false,
                array(),
                $override
            );
        } else {
            self::importYaml(
                _c('ROOT_PATH') . 'lib/generator/allocations.yml',
                false,
                array(),
                $override
            );
        }
    }

    // Contact triggers data
    static function generateContactTriggers()
    {
        global $db;

        // Old

        self::importYaml(
            _c('ROOT_PATH') . 'lib/generator/contact_triggers.yml',
            true
        );

        // New!

        self::importYaml(
            _c('ROOT_PATH') . 'lib/generator/triggers.yml',
            true
        );

        $db->update(
            'triggers',
            array(
                'last_send_date' => date('Y-m-d H:i:s'),
            ),
            ' trigger_id != ? ',
            array(
                0
            )
        );
    }

    // Miscellaneous data
    static function generateMisc()
    {
        global $db;

        $override = array(
            'cron' => array(
                'last_run' => function($date) {
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref . date(' H:i:s', strtotime($date)));
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d ', date('w') == 0 ? time() : strtotime('last sunday')) . date('H:i:s', strtotime($date)));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d H:i:s');
                },
            ),
            'external_classes' => array(
                'from_date' => function($date) {
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref);
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d', date('w') == 0 ? time() : strtotime('last sunday')));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d');
                },
                'to_date' => function($date) {
                    $ref = '2013-06-02';
                    $d1 = new DateTime($ref);
                    $d2 = new DateTime($date);
                    $i = $d1->diff($d2);
                    $newInt = new DateInterval('P' . $i->days . 'D');
                    $now = new DateTime(date('Y-m-d', date('w') == 0 ? time() : strtotime('last sunday')));
                    if ($i->invert) {
                        $now->sub($newInt);
                    } else {
                        $now->add($newInt);
                    }
                    return $now->format('Y-m-d');
                },
            ),
        );

        self::importYaml(
            _c('ROOT_PATH') . 'lib/generator/etc.yml',
            true,
            array(),
            $override
        );
    }

    static function getGroup($group)
    {
        global $db;
        switch (strtolower($group)) {
        case 'a':
            $mems = array(
                183,
                184,
                185,
                187,
                189,
                190,
                191,
                192,
                193,
                194,
            );
            break;
        case 'b':
            $mems = array(
                195,
                196,
                197,
                198,
                199,
                200,
                201,
                202,
                204,
                205,
            );
            break;
        case 'c':
            $mems = array(
                206,
                207,
                208,
                209,
                210,
                211,
                212,
                213,
                214,
                215,
            );
            break;
        case 'd':
            $mems = array(
                119,
                121,
                127,
                6,
                274,
                9,
                7,
                11,
                13,
                14,
            );
            break;
        case 'e':
            $mems = array(
                20,
                21,
                23,
                24,
                25,
                26,
                27,
                29,
                30,
                31,
            );
            break;
        case 'f':
            $mems = array(
                70,
                72,
                73,
                74,
                75,
                76,
                81,
                83,
                87,
                88,
            );
            break;
        }
        $rec = $db->queryArray(
            'SELECT member_id,card_id,first_name,last_name
            FROM members
            WHERE member_id IN(?,?,?,?,?,?,?,?,?,?)',
            $mems
        );
        $ret = array();
        while ($r = $rec->fetchRow()) {
            $r['used'] = false;
            $ret[] = $r;
        }
        return array(
            'results' => $ret,
        );
    }

    // Redo sessions remaining
    static function tidyUpMembers()
    {
        global $db;

        // Update session totals (run since last run, all at midnight run)
        Cap2_Projects_CoursePro_Class::updateRemainingSessions(true);

        // Sort out the report cache
        if (_c('ENABLE_NEW_REPORTS')) {
            Cap2_Projects_CoursePro_StaticReports::buildAllCaches();
        }
    }

    /**
     * Import data from a YAML file
     *
     * @param string $file     the file to import from
     * @param bool   $autodate whether to convert any date values to today's date
     * @param array  $limits   the limit to do for a particular table
     * @param array  $override any values to override for a particular table
     * @param array  $skip     any indexes to skip for a particular table
     *
     * @return void
     */
    static function importYaml($file, $autodate=false, $limits=array(),
        $override=array(), $skip=array()
    ) {
        global $db;

        if (!file_exists($file)) return;
        try {
            $tables = Yaml::parse(file_get_contents($file));
        } catch (Exception $e) {
            throw new Cap2_Projects_CoursePro_Exception(
                Cap2_Projects_CoursePro_Error::ERROR_DATA,
                'Error whilst parsing a YAML file: ' . $file
            );
        }

        foreach ($tables as $table => $rows) {
            if (self::passTable($table)) {
                continue;
            }

            if (self::identityTable($table)) {
                self::$_openIdentityTable = $table;
                $db->query(
                    $db->startIdentityInsert($table)
                );
            }

            $rowCount = count($rows);
            $collection = false;

            $fields = array();
            $wrappedFields = array();
            $start = 0;

            // We need to work something out
            if (key($rows[0]) === 0) {
                // We're in a collection of collections
                $fields = $rows[0];
                foreach ($fields as $key => $field) {
                    $wrappedFields[$key] = $db->wrap($field);
                }
                $collection = true;
                $start = 1;
            }

            for ($i = $start; ($i < $rowCount) && (!isset($limits[$table]) || $limits[$table] > 0); $i++) {
                $row = $rows[$i];

                if (!$collection) {
                    $fields = array_keys($row);
                    foreach ($fields as $key => $field) {
                        $wrappedFields[$key] = $db->wrap($field);
                    }
                }

                if (isset($skip[$table])) {
                    $test = $i;
                    if ($collection) {
                        $test -= 1;
                    }
                    if (in_array($test, $skip[$table])) {
                        continue;
                    }
                }

                $row = array_values($row);

                if (isset($override[$table])) {
                    foreach ($override[$table] as $key => $value) {
                        if (($search = array_search($key, $fields)) !== false) {
                            if (is_callable($value)) {
                                $row[$search] = $value($row[$search]);
                            } else {
                                $row[$search] = $value;
                            }
                        }
                    }
                }

                $row = self::parseFields($table, $fields, $row);

                $query = 'INSERT INTO '
                    . $db->wrap($table)
                    . '('
                    . implode(',', $wrappedFields)
                    . ')';

                $query .= ' VALUES (';
                $qs = array_fill(0, count($row), '?');
                $query .= implode(',', $qs);
                $query .= ')';

                $args = $row;

                foreach ($args as $ind => $val) {
                    if ($autodate
                        && preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}( [0-9]{2}:[0-9]{2}:[0-9]{2})?$/', trim($val))
                        && !(
                            isset($override[$table])
                            && isset($override[$table][$fields[$ind]])
                            && is_callable($override[$table][$fields[$ind]])
                        )
                    ) {
                        $args[$ind] = date('Y-m-d H:i:s');
                    }
                    if (is_string($val) && is_numeric($val)) {
                        $args[$ind] = _s($val);
                    }
                }

                $db->queryArray(
                    $query,
                    $args
                );

                if (isset($limits[$table])) {
                    $limits[$table] -= 1;
                }
            }
            if (self::identityTable($table)) {
                $db->query(
                    $db->endIdentityInsert($table)
                );
                self::$_openIdentityTable = '';
            }
        }
    }

    protected static function passTable($table)
    {
        global $core;

        $bridge = $core->getBridge();

        switch ($table) {
        case 'class_session_crm_changes':
            if (!$bridge->hasSessionsSync()) {
                return true;
            }
            break;
        case 'member_has_crm_members':
            if (!$bridge->hasMembers()) {
                return true;
            }
            break;
        }

        return false;
    }

    protected static function identityTable($table)
    {
        global $core;

        $bridge = $core->getBridge();
        switch ($table) {
        case 'memberships':
            if ($bridge->hasMemberships()
                && $bridge->hasNumericMemberships()
            ) {
                return false;
            }
        case 'membership_groups':
            if ($bridge->hasMembershipGroups()
                && $bridge->hasNumericMembershipGroups()
            ) {
                return false;
            }
            break;
        case 'member_has_memberships':
            if ($bridge->hasMemberMembershipIds()) {
                return false;
            }
            break;
        }
        if (in_array($table, self::$increment)) {
            return true;
        }
        return false;
    }

    protected static function parseFields($table, $fields, $row)
    {
        global $core;

        $bridge = $core->getBridge();
        switch ($table) {
        case 'members':
            if (!$bridge->hasMembers()) {
                if (($search = array_search('crm_member_id', $fields)) !== false) {
                    unset($row[$search]);
                }
            }
            break;
        case 'member_notes':
            if (!$bridge->hasMemberNotes()) {
                if (($search = array_search('crm_note_id', $fields)) !== false) {
                    unset($row[$search]);
                }
            }
            break;
        case 'memberships':
            if ($bridge->hasNumericMemberships()) {
                if (($search = array_search('crm_membership_id', $fields)) !== false) {
                    unset($row[$search]);
                }
            }
            break;
        case 'membership_groups':
            if ($bridge->hasNumericMembershipGroups()) {
                if (($search = array_search('crm_group_id', $fields)) !== false) {
                    unset($row[$search]);
                }
            }
            break;
        case 'receipts':
            if (!$bridge->hasManualTransactions()) {
                if (($search = array_search('hash_id', $fields)) !== false) {
                    unset($row[$search]);
                }
            }
            break;
        case 'transaction_tokens':
            if (!$bridge->hasManualTransactions()) {
                if (($search = array_search('hash_id', $fields)) !== false) {
                    unset($row[$search]);
                }
            }
            break;
        }

        return $row;
    }

    public static function generateTitles()
    {
        //Load the yaml into the titles table
        self::importYaml(
            _c('ROOT_PATH') . 'lib/generator/titles.yml',
            true
        );
        return  true;
    }

    /**
     * Generates Concessionary types and saves them into concessionary_types table
     *
     * @return bool
     * @throws Cap2_Projects_CoursePro_Exception
     */
    public static function generateConcessionaryTypes()
    {
        //Load the yaml into the concessionary_types table
        self::importYaml(
            _c('ROOT_PATH') . 'lib/generator/concessionaryTypes.yml',
            true
        );
        return true;
    }
}
