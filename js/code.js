var Code = {
  prepare: function(callback){
    // Register handlebars helpers
    this.registerHelpers();
    
    // Prepare only active events (started 30 mins ago through the future)
    var currentTime = new Date().valueOf();
    for (var i = 0; i < Data.events.length; i++) {
      ev = Data.events[i];
      ev.computedTime = new Date(ev.date + " " + ev.time);
      if (ev.computedTime.valueOf() + 1800000 > currentTime) {
        Data.activeEvents.push(ev);
      }
    }
    
    // Load and compile all the templates
    Templates = {};
    $("script[type='text/x-handlebars-template']").each(function(){
      Templates[$(this).data("template")] = Handlebars.compile($(this).html());
    });
    
    // Do whatever comes next
    callback();
  },
  render: function() {
    var titles = [
      "is for when someone asks you to code in MUMPS",
      "is for the beginning, middle, and end of a release sprint",
      "is learning Haskell just so I can go to their drinkup",
      "has too many fonts and not enough fonts",
      "only supports Chrome because, seriously, who uses anything else",
      "= new AbstractAlcoholDrinkFactoryFactory();",
      "wants to make it edgier and have it pop some more",
      "is writing a jQuery plugin to reinstitute the <blink> tag",
      "wants to know if you've turned it off and on again"
    ];
    var randomTitle = titles[Math.floor(Math.random() * titles.length)];
    
    $("#list").html(Templates.event(Data));
    $("title").text("Intoxicoders " + randomTitle);
  },
  registerHelpers: function() {
    Handlebars.registerHelper("tagger", function(){
      var tagHtml = ""
      for (var i = 0; i < this.tags.length; i++) {
        switch(this.tags[i]) {
          case "free":
            tagHtml += "<div class='tag free'>Free</div><br/>"; break;
          case "beer":
            tagHtml += "<div class='tag beer'>Beer!</div><br/>"; break;
          case "bar":
            tagHtml += "<div class='tag bar'>Bar</div><br/>"; break;
          default:
            break;
        }
      }
      return new Handlebars.SafeString(tagHtml);
    });
    
    Handlebars.registerHelper("month", function(){
      return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][this.computedTime.getMonth()];
    });
    
    Handlebars.registerHelper("date", function(){
      return this.computedTime.getDate();
    });
  }
};