$(function () {
    //new workout button
    $(".new-workout").on("submit", function (event) {
        event.preventDefault();
        const newName = $("#reg-name-input").val().trim();
        $.ajax({
            url: "/api/workouts",
            method: "POST",
            data: { name: newName }
        }).then((dbWorkout) => {
            console.log(dbWorkout);
            location.reload();
        });
    });

    // update exercise object on submit
    $(".update-form").on("submit", function (event) {
        event.preventDefault();
        const updateObj = {
            _id: $(this).attr("id"),
            name: event.target[0].value.trim(),
            count: event.target[1].value.trim(),
            unit: event.target[2].value.trim(),
            notes: event.target[3].value.trim()
        }
        console.table(updateObj);
        $.ajax({
            url: "/api/exercises",
            method: "PUT",
            data: updateObj
        }).then((dbExercise) => {
            location.reload();
            console.log(dbExercise);
        });
    });

    //creates new exercise on submit click
    $(".new-exercise").on("submit", function (event) {
        event.preventDefault();
        console.log($(this).attr("id"));
        const newExerObj = {
            _id: $(this).attr("id"),
            name: event.target[0].value.trim(),
            count: event.target[1].value.trim(),
            unit: event.target[2].value.trim(),
            notes: event.target[3].value.trim()
        }
        $.ajax({
            url: "/api/exercises",
            method: "POST",
            data: newExerObj
        })
            .then(dbExercise => {
                $.ajax({
                    url: "",
                    context: document.body,
                    success: function (data, err) {
                        $(this).html(data);
                    }
                });
            });
    })
    //deletes exercise on click 
    $(".exer-delete").click(function (event) {
        event.preventDefault();
        console.log($(this).attr("id"))

        $.ajax({
            url: "/api/exercises",
            method: "DELETE",
            data: { _id: $(this).attr("id") }
        }).then((dbExercise) => {
            $.ajax({
                url: "/",
                context: document.body,
                success: function (data, err) {
                    if (err) console.log(err);
                    $(this).html(data);
                }
            });

        });
        setTimeout(function () { location.reload(); }, 100);
    });

    //delete workout on click 
    $(".workout-delete").click(function (event) {
        event.preventDefault();
        console.log($(this).attr("id"));
        $.ajax({
            url: "/api/workouts",
            method: "DELETE",
            data: { _id: $(this).attr("id") }
        }).then((dbWorkout) => {
            console.log('script side')
        })
        setTimeout(function () { location.reload(); }, 100);
    });
});