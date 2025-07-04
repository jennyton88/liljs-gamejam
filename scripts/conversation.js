'use strict';

class Conversation {
    constructor(player_name, villager_name) {
        this.player_name = player_name;
        this.villager_name = villager_name;
        this.lines = [];
        this.choices = [];
        this.curr_line = "";
        this.counter = 0;
        this.choice = 0;
        this.results = [];
        this.chosen = false;
        this.max_choice = -1;
        this.choice_select = false;
    }

    setUpWords(convo) {
        let new_convo = [];
        for (let i = 0; i < convo.length; i++) {
            let line = convo[i];
            line = line.replace("{name}", this.player_name);
            line = line.replace("{item}", villagers[this.villager_name].task_item);
            new_convo.push(line);
        }

        this.lines = new_convo;

        this.curr_line = this.lines[this.counter];
    }

    setUpChoices(talk_type) {
        let choices = villager_convos[talk_type + "_choices"];
        this.results = villager_convos[talk_type + "_results"];

        let new_choices = [];
        for (let i = 0; i < choices.length; i++) {
            let line = choices[i];
            new_choices.push(line);
        }

        this.max_choice = new_choices.length - 1;
        this.choices = new_choices;
    }

    displayText() {
        drawRect(vec2(cameraPos.x, cameraPos.y - 3), vec2(10,2), BLACK);

        drawText(this.villager_name, vec2(cameraPos.x - 4.3, cameraPos.y - 2.35), 0.6);
        drawText(this.curr_line, vec2(cameraPos.x, cameraPos.y - 3), 0.4, WHITE, 0, WHITE, 'center');
    }


    displayChoices() {
        let choice_pos = vec2(cameraPos.x + 3, cameraPos.y);
        let offset = 1;

        let black = BLACK;
        let white = WHITE;

        drawRect(vec2(cameraPos.x + 3, cameraPos.y + offset), vec2(3.2,1), black);
        drawRect(vec2(cameraPos.x + 3, cameraPos.y), vec2(3.2,1), black);
        drawText(this.choices[0], vec2(choice_pos.x, choice_pos.y + offset), 0.4, white, 0, white, 'center');
        drawText(this.choices[1], choice_pos, 0.4, white, 0, white, 'center');

        drawText(this.curr_line, vec2(cameraPos.x, cameraPos.y - 3), 0.4, white, 0, white, 'center');

        let size = vec2(0.2,0.2);
        offset = this.choice == 0? 1 : 0;

        drawRect(vec2(choice_pos.x - 1.5, choice_pos.y + offset), size);
    }

    moveChoice(num) {
        let c = this.choice;
        if (num > 0) { c--; }
        else if (num < 0) { c++; }

        if (c > this.max_choice) { c = this.max_choice; }
        if (c < 0) { c = 0; }

        this.choice = c;
    }

    moveText() {
        this.counter++;
        if (this.counter == this.lines.length) {
            this.counter = 0;  
            return false;
        }

        this.curr_line = this.lines[this.counter];
        talk_sound_0.play();
        return true;
    }

    getChoice() {
        return this.choice;
    }

    resetChoice() {
        this.choice = 0;
        this.max_choice = -1;
    }

    displayResult() {
        this.curr_line = this.results[this.choice];
        this.curr_line = this.curr_line.replace("{name}", this.player_name);
        this.curr_line = this.curr_line.replace("{item}", villagers[this.villager_name].task_item);
    }

    destroy() {
        this.player_name = "";
        this.villager_name = "";
        this.lines = [];
        this.counter = 0;
        this.max_choice = -1;
        this.choice = 0;
        this.curr_line = "";
        this.choices = [];
    }
}