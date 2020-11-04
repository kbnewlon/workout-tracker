


// function createNewWorkout{


// }

// function updateWorkout{


// }


// get request that grabs last workout and dynamically creates card to display
function getLastWorkout() {

    $.ajax({
        url: "/api/workout",
        method: "GET"
    }).then(data => {
        console.log(data);
        $(".lastWorkout").html(`
        <ul class="list-group list-group-flush">
        <li class="list-group-item">date: ${data[0].dateCreated}</li>
        <li class="list-group-item">exercise name: ${data[0].exercises[0].name}</li>
        <li class="list-group-item">exercise type: ${data[0].exercises.type}</li>
        <li class="list-group-item">weight: ${data[0].exercises.weight}</li>
        <li class="list-group-item">sets: ${data[0].exercises.sets}</li>
        <li class="list-group-item">reps: ${data[0].exercises.reps}</li>
        <li class="list-group-item">duration: ${data[0].exercises.duration}</li>
        <li class="list-group-item">distance: ${data[0].exercises.distance}</li>
      </ul>
        `)
    })


//


}
//i want to be able to update the workout
//update 
$("#continue-btn").on("click", function (event) {
    event.preventDefault();
    $.ajax({
        type: "PUT",
        url: "/api/exercise",
        dataType: "json",
        data: {
            name: $("#name").val(),
            type: $("#type").val(),
            weight: $("#weight").val(),
            sets: $("#sets").val(),
            reps: $("#reps").val(),
            duration: $("#duration").val(),
            distance: $("#distance").val(),


        }
    })
        .then(function (data) {
            console.log(data);
            getLastWorkout();
         
        }
        );
    return false;


});

//i want to be able to add a new workout to the database
//add
$("#newWorkout-btn").on("click", function (event) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "/api/exercise",
        dataType: "json",
        data: {
            name: $("#name").val(),
            type: $("#type").val(),
            weight: $("#weight").val(),
            sets: $("#sets").val(),
            reps: $("#reps").val(),
            duration: $("#duration").val(),
            distance: $("#distance").val(),


        }
    })
        .then(function (data) {
            console.log(data);
            // getWorkout();
         
        }
        );
    return false;
});



getLastWorkout();