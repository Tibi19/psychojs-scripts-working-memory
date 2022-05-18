/**********  BEGIN ROUTINE  **********/

start_time_tracking = Date.now();
end_time_tracking = 0;
time_counter_tracking = 0;
data_count = 0;
routine_start_time = Date.now();


/**********  EACH FRAME  **********/

end_time_tracking = Date.now();
time_counter_tracking += (end_time_tracking - start_time_tracking);
start_time_tracking = Date.now();

if (time_counter_tracking >= (save_gaze_data_each_seconds * 1000)) {
    // Update tracking coordinates to the average of last n gazes
    let x = util.sum(window.xGazes) / window.xGazes.length;
    let y = util.sum(window.yGazes) / window.yGazes.length;
    
    tracking_pos = util.to_height(
        [
          x - psychoJS.window.size[0] / 2,
          -1 * (y - psychoJS.window.size[1] / 2)
        ], 
        'pix', 
        psychoJS.window
    );
    
    psychoJS.experiment.addData("count", data_count);
    data_count += 1;
    psychoJS.experiment.addData("eye_x", tracking_pos[0]);
    psychoJS.experiment.addData("eye_y", tracking_pos[1]);
    psychoJS.experiment.nextEntry();
 
    console.log("saved after " + time_counter_tracking + " millis");
 
    time_counter_tracking = 0;
}


/**********  END ROUTINE  **********/

routine_end_time = Date.now();
routine_time = routine_end_time - routine_start_time;

psychoJS.experiment.nextEntry();
psychoJS.experiment.addData("experiment_time", millisToMinutesAndSeconds(routine_time));
psychoJS.experiment.nextEntry();
