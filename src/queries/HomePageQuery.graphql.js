export const HOME_PAGE_QUERY = `
query {
  homePage {
    aboutMe {
      description
    }
    skills {
      baseDescription
      tec1 {
        title
        level
        description
        model {
          url
        }
      }
      tec2 {
        title
        level
        description
        model {
          url
        }
      }
      tec3 {
        title
        level
        description
        model {
          url
        }
      }
      tec4 {
        title
        level
        description
        model {
          url
        }
      }
      tec5 {
        title
        level
        description
        model {
          url
        }
      }
      tec6 {
        title
        level
        description
        model {
          url
        }
      }
    }
    work {
      projectTypes {
        text
      }
      projects {
        title
        image {
          url
        }
        tecs {
          text
        }
        description
        pageUrl
        codeUrl
      }
    }
  }
}`;