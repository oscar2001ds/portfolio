import { HOME_PAGE_QUERY } from "../queries/HomePageQuery.graphql";
import serializeResponse from "../utils/serializeResponse";
import { parseUrl } from "../utils/parseUrl";

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';

export const getHomePageData = async () => {
  try {
    const body = JSON.stringify({ query: HOME_PAGE_QUERY });
    const response = await fetch(`${STRAPI_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    const serializedData = serializeResponse(data).homePage;
    const formattedData = {
      ...serializedData,
      work: {
        ...serializedData?.work,
        projects: serializedData?.work?.projects?.map((project) => ({
          ...project,
          image: {
            url: parseUrl(STRAPI_API_URL, project.image?.url),
          },
        })) || [],
      },
    };
    return formattedData;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return null;
  }
}