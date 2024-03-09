function toggleImage(element) {
    var post = element.closest('.main_post');

    var backgroundImage = window.getComputedStyle(element).backgroundImage;

    if (backgroundImage.includes('CCAPDEV-LOGO-2/2.png')) {
        element.style.backgroundImage = "url('CCAPDEV-LOGO-2/16.png')";
        toggleOppositeImage(post, element, 'CCAPDEV-LOGO-2/3.png');
        updateVoteCount(post,1);

    } else if (backgroundImage.includes('CCAPDEV-LOGO-2/16.png')) {
        element.style.backgroundImage = "url('CCAPDEV-LOGO-2/2.png')";
        toggleOppositeImage(post, element, 'CCAPDEV-LOGO-2/3.png');
        updateVoteCount(post,-1);


    } else if (backgroundImage.includes('CCAPDEV-LOGO-2/3.png')) {
        element.style.backgroundImage = "url('CCAPDEV-LOGO-2/17.png')";
        toggleOppositeImage(post, element, 'CCAPDEV-LOGO-2/2.png');
        updateVoteCount(post,-1);

    } else if (backgroundImage.includes('CCAPDEV-LOGO-2/17.png')) {
        element.style.backgroundImage = "url('CCAPDEV-LOGO-2/3.png')";
        toggleOppositeImage(post, element, 'CCAPDEV-LOGO-2/2.png');
        updateVoteCount(post,1);

    }
}

function toggleOppositeImage(post, element, oppositeImageUrl) {
    var oppositeElement;
    if (element.classList.contains('up_vote')) {
        oppositeElement = post.querySelector('.down_vote');
    } else if (element.classList.contains('down_vote')) {
        oppositeElement = post.querySelector('.up_vote');
    }

    oppositeElement.style.backgroundImage = "url('" + oppositeImageUrl + "')";
}

function updateVoteCount(post,increment) {
    var numVote = post.querySelector('.num_vote');
    numVote.textContent = parseInt(numVote.textContent) + increment;
}


function navigateToPost(url) {
    if(!event.target.classList.contains('up_vote') && !event.target.classList.contains('down_vote')) {
        window.location.href = url;
    }
  }

function toggleDropdown_user() {
    var dropdownContent = document.querySelector('.dropdown-content_user');
    dropdownContent.classList.toggle('show_user');
}

function toggleDropdown_search() {
    var dropdownContent = document.querySelector('.dropdown-content_search');
    dropdownContent.classList.toggle('show_search');
}

// ------------------------------------------------------------------
function openLoginForm() {
    var modal = document.getElementById("loginFormModal");
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Disable scrolling on the body
}

function closeLoginForm() {
    var modal = document.getElementById("loginFormModal");
    modal.style.display = "none";
    document.body.style.overflow = ""; // Re-enable scrolling on the body
}

  
  // Close modal if clicked outside of it
  window.onclick = function(event) {
    var modal = document.getElementById("loginFormModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  