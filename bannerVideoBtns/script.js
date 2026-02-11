





<script>
jQuery(document).ready(function($) {
    var $infoBtn = $('#infoBtn');

    function syncTimedButton() {
        // Look at all videos found on the page
        $('video').each(function() {
            var video = this;

            // Attach the listener to every video tag
            $(video).off('timeupdate').on('timeupdate', function() {
                
                /* THE FIX: Ignore this video if:
                   1. It is paused
                   2. It is hidden (width/height is 0)
                   3. It's not part of the active Divi slide */
                var isHidden = video.offsetWidth === 0 || video.offsetHeight === 0;
                var isInactiveSlide = $(video).closest('.et_pb_slide').length && !$(video).closest('.et_pb_slide').hasClass('et-pb-active-slide');

                if (video.paused || isHidden || isInactiveSlide) {
                    return; // Exit and do nothing for this specific video
                }

                // If we got here, this is the "Main" video the user sees
                var currentTime = video.currentTime;
                var shouldShow = (currentTime >= 0 && currentTime <= 9);

                if (shouldShow && !$infoBtn.hasClass('active')) {
                    $infoBtn.addClass('active');
                    console.log("Main Video Active: Showing Button");
                } else if (!shouldShow && $infoBtn.hasClass('active')) {
                    $infoBtn.removeClass('active');
                    console.log("Main Video Past 9s: Hiding Button");
                }
            });
        });
    }

    // Initialize with a slight delay for Divi's loader
    setTimeout(syncTimedButton, 1500);

    // If the user resizes the screen, Divi might swap which video is 'visible'
    $(window).on('resize', function() {
        syncTimedButton();
    });
});
</script>


