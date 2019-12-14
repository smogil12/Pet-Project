$(document).ready(function() {
  $("#submitform").on("click", function(event) {
    event.preventDefault();

    window.PetfinderAPI.getPets(
      {
        size: $('input[name="size"]:checked').val(),
        gender: $('input[name="gender"]:checked').val(),
        age: $('input[name="age"]:checked').val(),
        status: $('input[name="status"]:checked').val(),
        good_with_children: $('input[name="kids"]:checked').val(),
        good_with_dogs: $('input[name="dogs"]:checked').val(),
        location: $('input[name="zip"]').val()
      },
      function(pets) {
        pets.forEach(function(pet) {
          $("#pets-list").append(`
            <li>
                <a href="${pet.url}">
                    <img src="${pet.photos[0].small}"><img>
                    <p>${pet.name}</p>
                </a>
             </li>
        `);

          console.log(pet);
        });
      }
    );
  });
});
