app.factory('ArticlesService', ['$http', '$filter',
  function($http, $filter) {
    const ARTICLE_NUM = 3;

    var articles = [{
      _id: 1,
      imageThumb: 'resources/images/blogs-thumb/blog-1.jpg',
      image: 'resources/images/blogs/blog-1.jpg',
      title: 'Introduction to Xcidic : Who We Are and Why We Exist',
      date: '07/17/2017',
      time: '07.00 PM',
      author: 'Xcidic.com',
      detail:  
      `
            <p>From the dream of colonisation of Mars to the driverless concept of our daily transportation, scenes from sci-fiction movies are fast becoming a reality. Technology has evolved exponentially at the recent time and no doubt this era of &ldquo;IT age&rdquo; might transist into the Space age sooner than we imagine.</p>
            <p>Without any doubt, one should embrace technology with openness. We believe while some are meant to replace human labour in view of cost cutting, most are meant to benefit mankind. No longer you will be worried about misplacing important hardcopy files, missing an appointment, the hassle of doing grocery shopping etc. Technology has ease the life of many individuals and increasing the efficiency and productivity of businesses. This is what we believe and this is how we got started. </p>
            <p>Xcidic was started in a classroom back then in the University which the founding team used to study in. The whole startup was created purely based on the same passion for coding and design, aspires to create a solution which would make a difference to the people&rsquo;s life.</p>
            <p>Through our tagline <strong>&ldquo;Your creative solution&rdquo;</strong>, we want to go the extra mile for our clients and partners; solving their pain-points or implementing their idea as a functional yet creative deliverable. </p>
            <p>At the start, Xcidic is involved mostly in website development. Since then, our capability and arsenal of firepower had since upgraded a few of notches. We are now providing services to develop web applications, e.g <strong>E-commerce</strong>, <strong>CRM (Customer Relationship Management)</strong> or <strong>ERP (Enterprise Resources Planning)</strong> as well as <strong>IT consultancy</strong> to the holistic system application framework. We had also managed to help a couple of startups to deliver their ideas by developing the technology solution or product. We see ourselves more of their partners in crime than being in a one off vendor-client relationship.</p>
            <p>With a passion to deliver beyond expectation, we take our project delivery with pride and believe every project represents Xcidic as a whole. We treat our clients as part of our team and partners as we believe every successful project needs both sides to work toward a common goal. Once we are being engaged for a project, we always believe in long-term working commitment with our client partners. All of our existing projects are in Singapore at the moment and we are planning for the next big step in Jakarta.</p>
            <p>Most of all, our main vision is to build a family rather than a company. Beside spending most of our life with our loved ones back at home and with friends, we are spending as much time with our co-workers. We want all our members to enjoy a second home here in Xcidic, working on their passion for coding, designing or whatever they enjoy doing. Most importantly, <strong>We Exist to Make a Difference!</strong></p>
            `
    }];

    return {
      getArticles : function() {
        return $filter('filter')(articles);
      },
      getArticleDetail : function(ArticleId) {
        var article = $filter('filter')(articles, { _id: parseInt(ArticleId, 10) }, true)[0];
        
        return article;
      }
    };
  }
]);