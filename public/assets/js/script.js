




// make a get request to grab the last workout (/workout) and then create the card dynamically with the results from the ajx call


function getWorkout() {




}

function getLastWorkout() {

    $.ajax({
        url: "/api/workout",
        method: "GET"
    }).then(data => {
        console.log(data);
        $(".lastWorkout").html(`
        <ul class="list-group">
        <li class="list-group-item">date:${data[0].dateCreated}</li>
        <li class="list-group-item">exercise name: ${data[0].exercises[0].name}</li>
        <li class="list-group-item">Third item</li>
        <li class="list-group-item">First item</li>
        <li class="list-group-item">Second item</li>
        <li class="list-group-item">Third item</li>
        <li class="list-group-item">First item</li>
        <li class="list-group-item">Second item</li>
      </ul>
        `)
    })




}


getLastWorkout();