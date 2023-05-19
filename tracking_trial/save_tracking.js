/**********  BEGIN ROUTINE  **********/

start_time_tracking = Date.now();
end_time_tracking = 0;
time_counter_tracking = 0;
data_count = 0;
routine_start_time = Date.now();
last_eye_zone_start = 0;

/**********  EACH FRAME  **********/

end_time_tracking = Date.now();
time_counter_tracking += (end_time_tracking - start_time_tracking);
start_time_tracking = Date.now();

if (time_counter_tracking >= (save_gaze_data_each_seconds * 1000)) {
    original_eye_zone = eye_zone;
    tracking_pos = getGazePosition();
    
    if(tracking_pos[0] <= left_to_middle_screen_x_breakpoint)
        eye_zone = "left";
    else if(tracking_pos[0] >= middle_to_right_screen_y_breakpoint)
        eye_zone = "right";
    else
        eye_zone = "middle";
        
    if(original_eye_zone !== eye_zone){
        if(last_eye_zone_start > 0) {
            dwell_time = Date.now() - last_eye_zone_start;
            psychoJS.experiment.addData("dwell_time", millisToMinutesAndSeconds(dwell_time));
            psychoJS.experiment.nextEntry();
        }
        last_eye_zone_start = Date.now();
    }
    
    psychoJS.experiment.addData("count", data_count);
    data_count += 1;
    psychoJS.experiment.addData("eye_x", tracking_pos[0]);
    psychoJS.experiment.addData("eye_y", tracking_pos[1]);
    psychoJS.experiment.addData("eye_zone", eye_zone);
    psychoJS.experiment.addData("dwell_time", "");
    psychoJS.experiment.nextEntry();

    time_counter_tracking = 0;
}

/**********  END ROUTINE  **********/

routine_end_time = Date.now();
routine_time = routine_end_time - routine_start_time;
last_eye_zone_start = 0;

psychoJS.experiment.nextEntry();
psychoJS.experiment.addData("experiment_block_time", millisToMinutesAndSeconds(routine_time));
psychoJS.experiment.nextEntry();
