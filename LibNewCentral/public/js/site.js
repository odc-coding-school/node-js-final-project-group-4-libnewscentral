$(function () {
     // start the ticker 
	$('#js-news').ticker();
	
	// hide the release history when the page loads
	$('#release-wrapper').css('margin-top', '-' + ($('#release-wrapper').height() + 20) + 'px');

	// show/hide the release history on click
	$('a[href="#release-history"]').toggle(function () {	
		$('#release-wrapper').animate({
			marginTop: '0px'
		}, 600, 'linear');
	}, function () {
		$('#release-wrapper').animate({
			marginTop: '-' + ($('#release-wrapper').height() + 20) + 'px'
		}, 600, 'linear');
	});	
	
	$('#download a').mousedown(function () {
		_gaq.push(['_trackEvent', 'download-button', 'clicked'])		
	});
    
        // Initialize like and comment counts
        let likeCount = 0;
        let commentCount = 0;
        let usersWhoLiked = ['User1', 'User2', 'User3'];  // Example users who liked the post

        // Function to update like count and user list
        function updateLikeCount(user) {
            likeCount++;
            $('#likeCount').text(likeCount);
            usersWhoLiked.push(user);  // Add the new user to the list
            updateLikeList();  // Update the modal with the new list of users
        }

        // Function to update the like list in the modal
        function updateLikeList() {
            $('#likeList').empty();  // Clear the existing list
            usersWhoLiked.forEach(function(user) {
                $('#likeList').append('<li>' + user + '</li>');  // Add each user who liked the post
            });
        }

        // Event listener for clicking the like icon (to increase likes)
        $('#likeIcon').on('click', function() {
            let currentUser = 'You';  // Placeholder for the current user (you can replace this with actual logged-in user info)
            updateLikeCount(currentUser);
        });

        // Function to add a new comment to the comment list
        function addCommentToList(comment) {
            $('#commentList').append('<div class="comment-item"><strong>You:</strong> ' + comment + '</div>');
        }

        // Handle comment form submission
        $('#commentForm').on('submit', function(event) {
            event.preventDefault();
            var comment = $('#commentText').val().trim();
            
            if (comment !== '') {
                // Increment the comment count
                commentCount++;
                
                // Update the comment count in the DOM
                $('#commentCount').text(commentCount);

                // Add the new comment to the comment list
                addCommentToList(comment);
                
                // Clear the textarea and reset
                $('#commentText').val('');
            }
        });

        // Initially update the like list in the modal
        updateLikeList();
	});





