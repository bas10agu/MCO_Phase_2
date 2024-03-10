$(document).ready(function(){
    $('#imageUpload').on('change', function() {
        var file = this.files[0];

        if (file && file.type.startsWith('image/')) { // Check if the file is an image
            var reader = new FileReader();
            reader.onload = function(e) {
                var imageDataUrl = e.target.result;
                var fileName = file.name;
                
                if (fileName.length > 30) {
                    fileName = fileName.substring(0, 30) + '...';
                }
                
                // Apply the uploaded image as the background of .main_post-img
                $('#uploadedImageContainer').css('background-image', 'url(' + imageDataUrl + ')');
                
                $('.file_name').text("Attachment: "+fileName).show();
                $('.src').text(imageDataUrl);
    
                // Get dominant color of the image
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image file.');
            $('#imageUpload').val(''); // Clear the file input
        }
    });

    $('.post-box-container').click(function(){
        const title = $('.title-box').val();
        const body = $('.body-box').val();
        const flair = $('input[name="flair"]:checked').val();
        let img = $('.src').text();
        let stats = 'hidden';
    
        if(title !== '' && body !== '') {
            if(img !== '') {
                stats = '';
                // Create an image element to calculate dominant color
                const image = new Image();
                image.crossOrigin = "Anonymous";
                image.src = img;
                image.onload = function() {
                    // Calculate dominant color using ColorThief
                    const colorThief = new ColorThief();
                    const dominantColor = colorThief.getColor(image);
                    const rgbColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
    
                    appendPost(title, body, flair, img, rgbColor, stats);
                }
            } else {
                appendPost(title, body, flair, img, '', stats);
            }
        }
    
        $('.title-box').val('');
        $('.body-box').val('');
        $('input[name="flair"][value="general-question"]').prop('checked', true);
        $('.file_name').text('').hide();
        $('.src').text('');
    });
    
    function appendPost(title, body, flair, img, rgbColor, stats) {
        const imgContainer = img !== '' ? `
            <div class="main_post-img-container">
                <div class="blurred-background" style="background-color: ${rgbColor};"></div>
                <img class="main_post-img" src="${img}" alt="" ${stats}>
            </div>` : '';
    
        $('.post_list').append(`
            <div class="main_post" id="post-1">
                <div class="main_post-top" onclick="navigateToPost('/post')">
                    <div class="main_post-desc">
                        <div class="main_post-desc-poster">
                            <div class="main_post-desc-poster-pic"></div>
                            <div class="main_post-desc-poster-name">
                                u/Kooky_Marketing_3807
                            </div>
                            <div class="main_post-desc-banner" id="${flair}">${flair}</div>
                        </div>
                        
                        <div class="main_post-desc-title">
                            ${title}
                        </div>
                        <div class="main_post-desc-content">
                            ${body}
                        </div>
                        ${imgContainer}
                    </div>
                    <div class="main_post-buttons">
                        <div class="main_vote">
                            <img class="up_vote" src="CCAPDEV-LOGO-2/2.png" alt="">
                            <img class="up_vote_filled" src="CCAPDEV-LOGO-2/16.png" alt="" hidden>
                            <span class="num_vote">0</span>
                            <img class="down_vote" src="CCAPDEV-LOGO-2/3.png" alt="">
                            <img class="down_vote_filled" src="CCAPDEV-LOGO-2/17.png" alt="" hidden>
                        </div>
                        <div class="button-container">
                            <div class="main_post-buttons-comment"></div>
                            <span>Comment</span>
                        </div>
                        <div class="button-container">
                            <div class="main_post-buttons-share"></div>
                            <span>Share</span>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
});
