const { bgWhite } = require("chalk");
const read_line = require('readline');
const wait =require('./wait');


module.exports = class ProgressBar {
    constructor() {
        this.total;
        this.current;
        this.bar_length = 50;
    }

    init(total) {
        this.total = total;
        this.current = 0;
        this.update(this.current);
    }

    update(current, status) {
        this.current = current;
        const current_progress = this.current / this.total;
        this.draw(current_progress, status);
    }

    draw(current_progress, statusin) {
        const filled_bar_length = (current_progress * this.bar_length).toFixed(0);
        const empty_bar_length = this.bar_length - filled_bar_length;

        const filled_bar = this.get_bar(filled_bar_length, " ", bgWhite);
        const empty_bar = this.get_bar(empty_bar_length, "-");
        const percentage_progress = (current_progress * 100).toFixed(0);
        let status = statusin;

        if(typeof status === 'undefined')
        {
            read_line.clearLine(process.stdout,-1);
            read_line.cursorTo(process.stdout, 0);
            status = '';
            process.stdout.write(
                `\rCoursePro generation progress: [${filled_bar}${empty_bar}] | ${percentage_progress}%`
            );
        }
        if(status.length > 0)
        {
            read_line.clearLine(process.stdout,-1);
            read_line.cursorTo(process.stdout, 0);
            process.stdout.write(
                `\rCoursePro generation progress: [${filled_bar}${empty_bar}] | ${percentage_progress}% | Currently Running: ${status}`
            );
        }
        if(percentage_progress == 100)
        {
            read_line.clearLine(process.stdout,-1);
            read_line.cursorTo(process.stdout, 0);
            process.stdout.write(
                `\rCoursePro generation progress: [${filled_bar}${empty_bar}] | Generated`
            );
            wait.wait(1000);
            process.stdout.write(
                `\r`
            );
        }
    }

    get_bar(length, char, color = a => a) {
        let str = "";
        for (let i = 0; i < length; i++) {
            str += char;
        }
        return color(str);
    }
};