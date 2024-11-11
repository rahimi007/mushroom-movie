document.querySelector(".loading-circle").style.display = "none";
  document.querySelector(".loading-circle").style.display = "";
  const API_KEY = "38f891d4004c1f645c1ece24ff8857ea";
  const BASE_URL = "https://api.themoviedb.org/3";
  const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
  
  var loading = document.getElementById("loading");
  
  $("#search-button").click(function () {
    $("#suggestions").empty();
    loading.style.display = "block";
    const query = $("#search-input").val();
    searchMovies(query);
  });
  $("#search-input").keydown(function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior
      $("#search-button").click(); // Trigger the search button click
    }
  });
  
  function searchMovies(query) {
    $.ajax({
      url: `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`,
      method: "GET",
      success: function (data) {
        displayResults(data.results);
        loading.style.display = "none";
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  }
  
  function displayResults(results) {
    const resultsContainer = $("#results");
    resultsContainer.empty();
  
    results.forEach((item) => {
      $("#suggestions").empty();
      if (item.media_type === "movie" || item.media_type === "tv") {
        const card = $("<div>").addClass("movie-card");
        const poster = $("<img>")
          .addClass("movie-poster")
          .attr(
            "src",
            item.poster_path
              ? POSTER_BASE_URL + item.poster_path
              : "https://via.placeholder.com/300x450"
          )
          .attr("alt", item.title || item.name);
        const title = $("<div>")
          .addClass("movie-title")
          .text(item.title || item.name);
        const year = new Date(
          item.release_date || item.first_air_date
        ).getFullYear();
        const yearSpan = $("<span>").text(` (${year})`);
        const infoButton = $("<button>").addClass("info-button").text("i");
        const expandButton = $("<button>")
          .addClass("expand-button")
          .text("+");
        const infoOverlay = $("<div>").addClass("info-overlay");
        const actionButtons = $("<div>").addClass("action-buttons");
  
        const flixWaveImage = "https://example.com/path/to/your/image.png"; // Replace with the actual image URL
        const flixWaveButton = createActionButton(flixWaveImage, () => {
          const formattedTitle = (item.title || item.name).toLowerCase().replace(/ /g, "-");
          window.open(`https://flix-wave.lol/${formattedTitle}`, "_blank");
        });
        

        let isExpanded = false;
        expandButton.click(function (e) {
          e.stopPropagation();
          isExpanded = !isExpanded;
          actionButtons.toggle();
          expandButton.text(isExpanded ? "-" : "+");
        });
  
        infoButton.click(function (e) {
          e.stopPropagation();
          getAdditionalInfo(item.id, item.media_type, infoOverlay);
          infoOverlay.toggle();
        });
  
        // Define image URLs for each button
        const donyayeSerialImage =
          "https://donyayeserial.com/wp-content/uploads/2023/02/logo.png";
        const almasMovieImage =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAclBMVEUbJTcaJDYVIDMNGy8PHDAYIjUTHjJKUF5xdX51eoJla3VrcHp/g4sqM0I1PUtUWmZXXWetsLWkp6yLj5aDh46bnqTa2tuSlZzMzc+7vcBeZG84P09AR1SztbkkLT1ITloFFSufo6nGx8q+wMPg4OHt7ezBPtOdAAABWklEQVR4AbXQBZIkIRBA0aRcgYRCGynpvf8Rx2fotZCVH0HYw+G/Rqr6peZ1tG3TkUdr234Yx3Gal3Fa6cTgQQlwFFJuSqNBaazzRVvwaBd6CzGyMERtHU7QwlskzWJTZg1G5L1pvRNM4rCSN1uHY1wHXMzBIL00HcvszjclabriMqrzPNXyHtpobRxfdcDLxkOcOirxVjzjZaV0MkFyjiucwhaHkF8L5ui9kL1zCch8bdPl8k0tdfVSfUMJwIQVnABpZnu/f3NMYqgAoJ7dAE1SJ2teb7TzM9IlbmJqXu8nzdoEEW87vFX7y2Sl7UgIVCxuKQjMDbxHOh8vq7VYW+gGZP0hclX+tuWXNpubu3Y1hqkjtwQe1OPRC+f3jEaZnrxaUfAonD4ps5fpodhbbfLubjZUWuViZWcW1f4ygbbFilbcSTSUPFrRjp+CtvDrSO1DBb+tK/Z3PQPWkBxuyCxmHgAAAABJRU5ErkJggg==";
        const digiMoviezImage =
          "data:image/jpeg;base64,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";
        const alphaDLImage =
          "https://i.postimg.cc/Kz8gT0Vd/downloaqad.jpg";
  
        const donyayeSerialButton = createActionButton(
          donyayeSerialImage,
          () => openWebsite(item, "https://donyayeserial.com/")
        );
        const almasMovieButton = createActionButton(almasMovieImage, () =>
          openWebsite(item, "https://almasmovie.website/")
        );
        const digiMoviezButton = createActionButton(digiMoviezImage, () =>
          openWebsite(item, "https://digimoviez.com/?s=")
        );
        const alphaDLButton = createActionButton(alphaDLImage, () =>
          openAlphaDL(item.id, item.media_type)
        );
        const imdbButton = createActionButton(
          "data:image/jpeg;base64,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",
          () => openIMDB(item.id, item.media_type)
        );
        const recommendationsButton = createActionButton(
          "https://i.postimg.cc/fyX5BPYt/out-0-10.webp",
          () => showSimilar(item.id, item.media_type)
        );
  
        actionButtons.append(
          donyayeSerialButton,
          almasMovieButton,
          digiMoviezButton,
          recommendationsButton,
          imdbButton,
          alphaDLButton,
          flixWaveButton
        );
  
        title.append(yearSpan);
        card.append(
          poster,
          title,
          infoButton,
          expandButton,
          infoOverlay,
          actionButtons
        );
        resultsContainer.append(card);
      }
    });
  
    $("body").click(function () {
      $(".info-overlay").hide();
    });
  }
  
  function createActionButton(imageUrl, onClick) {
    return $("<button>")
      .addClass("action-button")
      .html(`<img src="${imageUrl}" alt="Action Button" />`)
      .click(onClick);
  }
  
  function getAdditionalInfo(id, mediaType, infoOverlay) {
    $.ajax({
      url: `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&append_to_response=credits`,
      method: "GET",
      success: function (data) {
        const director = data.credits.crew.find(
          (person) => person.job === "Director"
        );
        const cast = data.credits.cast.slice(0, 3);
        const genres = data.genres.map((genre) => genre.name).join(", ");
        const countries = data.production_countries
          .map((country) => country.name)
          .join(", ");
  
        let infoText = `Director: ${director ? director.name : "N/A"}<br>`;
        infoText += `Cast: ${cast.map((actor) => actor.name).join(", ")}<br>`;
        infoText += `Genres: ${genres || "N/A"}<br>`;
        infoText += `Countries: ${countries || "N/A"}<br>`;
        if (mediaType === "tv") {
          infoText += `Seasons: ${data.number_of_seasons}<br>`;
          infoText += `Episodes: ${data.number_of_episodes}<br>`;
        }
        infoText += `Duration: ${
          data.runtime || data.episode_run_time[0] || "N/A"
        } min`;
        infoOverlay.html(infoText);
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  }
  
  function openWebsite(item, baseUrl) {
    let url = baseUrl;
    const title = item.title || item.name;
    const year = new Date(
      item.release_date || item.first_air_date
    ).getFullYear();
  
    if (
      baseUrl.includes("donyayeserial.com") ||
      baseUrl.includes("almasmovie.website")
    ) {
      url += title.toLowerCase().replace(/ /g, "-");
      if (item.media_type === "movie") {
        url += `-${year}`;
      }
      url += "/";
    } else if (baseUrl.includes("digimoviez.com")) {
      url += title.toLowerCase().replace(/ /g, "+");
      if (item.media_type === "movie") {
        url += `+${year}`;
      }
    }
  
    window.open(url, "_blank");
  }
  
  function showSimilar(id, mediaType) {
    $.ajax({
      url: `${BASE_URL}/${mediaType}/${id}/recommendations?api_key=${API_KEY}`,
      method: "GET",
      success: function (data) {
        displayResults(data.results);
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  }
  
  function openIMDB(id, mediaType) {
    $.ajax({
      url: `${BASE_URL}/${mediaType}/${id}/external_ids?api_key=${API_KEY}`,
      method: "GET",
      success: function (data) {
        if (data.imdb_id) {
          window.open(`https://www.imdb.com/title/${data.imdb_id}`, "_blank");
        }
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  }
  
  function openAlphaDL(id, mediaType) {
    $.ajax({
      url: `${BASE_URL}/${mediaType}/${id}/external_ids?api_key=${API_KEY}`,
      method: "GET",
      success: function (data) {
        if (data.imdb_id) {
          window.open(`https://alphadl.online/${data.imdb_id}`, "_blank");
        }
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  }
  
  $(document).ready(function () {
    const API_KEY = "38f891d4004c1f645c1ece24ff8857ea";
    const BASE_URL = "https://api.themoviedb.org/3";
  
    $("#search-input").on("input", function () {
      const query = $(this).val();
      if (query.length > 2) {
        $.ajax({
          url: `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`,
          method: "GET",
          success: function (data) {
            displaySuggestions(data.results);
          },
          error: function (error) {
            console.error("Error:", error);
          },
        });
      } else {
        $("#suggestions").empty();
      }
    });
  });
  $("#search-button").click(function () {
  $("#suggestions").empty();
  loading.style.display = "block";
  const query = $("#search-input").val();
  
  // Save the search input to Firebase
  $.ajax({
      url: "https://ocean-b662f-default-rtdb.firebaseio.com/searches.json", // Adjust the path as needed
      method: "POST",
      data: JSON.stringify({ searchTerm: query }), // Save the search term
      contentType: "application/json",
      success: function () {
          console.log("Search term saved successfully!");
      },
      error: function (error) {
          console.error("Error saving search term:", error);
      }
  });

  searchMovies(query);
});


    // function displaySuggestions(results) {
    //   const suggestionsContainer = $("#suggestions");
    //   suggestionsContainer.empty();
  
    //   results.forEach((item) => {
    //     if (item.media_type === "movie" || item.media_type === "tv") {
        //   const suggestionItem = $("<div>")
        //     .addClass("suggestion-item")
        //     .text(item.title || item.name)
        //     .click(function () {
        //       $("#search-input").val($(this).text());
        //       suggestionsContainer.empty();
        //     });
        //   suggestionsContainer.append(suggestionItem);
        // }
      // });
    // }
  
  //   $(document).click(function (event) {
  //     if (!$(event.target).closest(".search-container").length) {
  //       $("#suggestions").empty();
  //       // $("#search-button").click(); // Trigger the search button click
  //     }
  //   });
  ;