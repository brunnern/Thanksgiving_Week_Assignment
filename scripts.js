$(document).ready(function () {
    const $topicsContainer = $("#topics-container");
    const $status = $("#status");
    const $categoryFilter = $("#category-filter");
    const $difficultyFilter = $("#difficulty-filter");

    $('#load-topics').on('click', function () {
        // Clear any old content
        $topicsContainer.empty();
        $status.text('Loading topics...');

        // AJAX request to data.json
        $.ajax({
            url: 'data.json',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                const topics = data.topics || [];
                const selectedCategory = $categoryFilter.val();
                const selectedDifficulty = $difficultyFilter.val();

                // Filter topics based on user selections
                const filteredTopics = topics.filter(topic => {
                    const categoryMatch = selectedCategory === 'all' || topic.category === selectedCategory;
                    const difficultyMatch = selectedDifficulty === 'all' || topic.difficulty === selectedDifficulty;
                    return categoryMatch && difficultyMatch;
                });

                // Build and append DOM elements for each topic
                filteredTopics.forEach(topic => {
                    const $card = $('<div>').addClass('topic-card');

                    const $category = $('<div>').addClass('topic-category').text(topic.category);

                    const $title = $('<h3>').addClass('topic-title').text(topic.title);
                    
                    const $summary = $('<div>').addClass('topic-summary').text(topic.summary);

                    const $difficulty = $('<div>').addClass('topic-difficulty').text(topic.difficulty);

                    $card.append($category, $title, $summary, $difficulty);
                    $topicsContainer.append($card);
                });

                $status.text(`Loaded ${filteredTopics.length} topic(s).`);
            },
            error: function (xhr, status, error) {
                console.error('AJAX error:', status, error);
                $status.text('Failed to load topics. Check the console and your file paths.');
            }
        });
    });
});