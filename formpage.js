$(document).ready(function() {
  $("#submitform").on("click", function(event) {
    event.preventDefault();

    window.PetfinderAPI.getPets(
      {
        size: $('input[name="size"]:checked').val(),
        gender: $('input[name="gender"]:checked').val(),
        age: $('input[name="age"]:checked').val(),
        status: $('input[name="status"]:checked').val(),
        kids: $('input[name="kids"]:checked').val(),
        dogs: $('input[name="dogs"]:checked').val()
      },
      function(pets) {
        pets.forEach(function(pet) {
          $("#pets-list").append(`<li>${pet.name}</li>`);
          console.log(pet);
        });
      }
    );
  });
});
