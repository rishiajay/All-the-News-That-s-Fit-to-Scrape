// need to work on
$(document).ready(function(){

    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    initPage();

    function initPage(){
        articleContainer.empty();
        $.get("/api/headlines?saved=false")
        .then(function(data){
            if (data && data.length) {
                renderArticles(data);
            }
            else{
                renderEmpty();
            }
        });
    }
    
    function renderArticles(article) {
        var articlePanels = [];
        for (var i = 0; i < articlePanels.length; i++) {
            articlePanels.push(createPanel(article[i]));
        }
        articleContainer.append(articlePanels);
    }
    function createPanel(article){
        // work on
        var panel = 
        $(["<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "</h3>",
        article.headline,
        "<a class='btn btn-danger delete'>",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        article.summary,
        "</div>",
        "</div>"
        ].join(""));

        panel.data("_id", article._id);
        return panel;
    }
    function renderEmpty() {
        var emptyAlert = 
        $(["<div class='alert alert-warning text-center'>",
        "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>What Would You Like to Do?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a href='/'>Browse Articles</a></h4>",
        "</div>",
        "</div>"
        ].join(""));
        articleContainer.append(emptyAlert);
    }
    function renderNotesList(data){

        var notesToRender = [];
        var currentNote;
        if(!data.notes.length) {
            currentNote = {

            }
        }
    }


})