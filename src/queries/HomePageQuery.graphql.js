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
      }
      tec2 {
        title
        level
        description
      }
      tec3 {
        title
        level
        description
      }
      tec4 {
        title
        level
        description
      }
      tec5 {
        title
        level
        description
      }
      tec6 {
        title
        level
        description
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