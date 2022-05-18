/**********  BEGIN ROUTINE  **********/

random_digits_span = '';
digits_states_object = {
    task: 'task', 
    show: 'show_digits', 
    insert: 'insert_digits',
    correct: 'correct_digits_show_model'
};
state_of_digits_span = digits_states_object.task;
time_counter = 0;
start_time = 0;
end_time = 0;

/**********  EACH FRAME  **********/

if (key_reverse_digits.status === PsychoJS.Status.STARTED && state_of_digits_span === digits_states_object.task) {
    let theseKeys = key_reverse_digits.getKeys({keyList: ['space'], waitRelease: false});
    allKeys_for_reverse_digits = '';
    allKeys_for_reverse_digits = allKeys_for_reverse_digits.concat(theseKeys);
    
    if (allKeys_for_reverse_digits.length > 0) {
        digits_info.opacity = 1;
        imagine_dreapta_a.opacity = 0;
        imagine_dreapta_b.opacity = 0;
        imagine_dreapta_c.opacity = 0;
        raspuns_participant.stop();
        random_digits_span = getRandomDigits(digits_for_reverse_digits, digits_count_for_reverse_digits);
        digits_info.setText(random_digits_span);
        state_of_digits_span = digits_states_object.show;
    }
}

if(state_of_digits_span === digits_states_object.show) {
    if(start_time > 0) {
        end_time = Date.now();
        time_counter += (end_time - start_time);
    }
    start_time = Date.now();
    if(time_counter >= (show_digits_for_seconds * 1000)) {
        digits_info.opacity = 0;
        start_time = 0;
        end_time = 0;
        time_counter = 0;
        textbox.opacity = 1;
        state_of_digits_span = digits_states_object.insert;
    }
}

if(key_reverse_digits.status === PsychoJS.Status.STARTED && state_of_digits_span === digits_states_object.insert) {
    let theseKeys = key_reverse_digits.getKeys({keyList: ['return'], waitRelease: false});
    allKeys_for_reverse_digits = '';
    allKeys_for_reverse_digits = allKeys_for_reverse_digits.concat(theseKeys);
    
    if (allKeys_for_reverse_digits.length > 0) {
        let input_text = textbox.getText().slice(0, -1); // slice to remove the \n added by default to textbox
        let random_digits_span_reversed = reverseString(random_digits_span);
        is_digits_answer_correct = input_text == random_digits_span_reversed;
        
        if(is_digits_answer_correct) {
            textbox.opacity = 0;
            textbox.setText('');
            random_digits_span = '';
            state_of_digits_span = digits_states_object.correct;
        } else {
            digits_info.opacity = 1;
            textbox.opacity = 0;
            textbox.setText('');
            random_digits_span = getRandomDigits(digits_for_reverse_digits, digits_count_for_reverse_digits);
            digits_info.setText(random_digits_span);
            state_of_digits_span = digits_states_object.show;
        }
    }
}

if(state_of_digits_span === digits_states_object.correct) {
    model_stanga.setAutoDraw(true);
    if(start_time > 0) {
        end_time = Date.now();
        time_counter += (end_time - start_time);
    }
    start_time = Date.now();
    if(time_counter >= (show_model_for_seconds_on_correct_digits * 1000)) {
        start_time = 0;
        end_time = 0;
        time_counter = 0;
        imagine_dreapta_a.opacity = 1;
        imagine_dreapta_b.opacity = 1;
        imagine_dreapta_c.opacity = 1;
        state_of_digits_span = digits_states_object.task;
        raspuns_participant.start();
    }
}