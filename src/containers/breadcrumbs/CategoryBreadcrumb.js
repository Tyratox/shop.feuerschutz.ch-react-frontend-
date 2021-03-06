import { getLanguage, getProductCategoryBySlug } from "../../reducers";
import { pathnamesByLanguage } from "../../utilities/urls";

/**
 * Generates the breadcrumb array for a category
 * @param {Object} match The react router match object
 * @param {Object} location The react router location object
 * @param {Object} state The redux state
 * @returns {Array} The breadcrumb array
 */
export const generateCategoryBreadcrumbs = ({ url }, { pathname }, state) => {
  const slugs = pathname.replace(url, "").split("/");
  slugs.shift();
  if (!isNaN(slugs[slugs.length - 1])) {
    slugs.pop();
  }
  const categories = slugs
    .map(slug => getProductCategoryBySlug(state, slug))
    .filter(c => c);

  const language = getLanguage(state);

  return categories.map(({ slug, name }, index) => ({
    url: `/${language}/${pathnamesByLanguage[language].productCategory}/${
      index > 0
        ? categories
            .slice(0, index)
            .map(category => category.slug)
            .join("/") + "/"
        : ""
    }${slug}/1`,
    name: name
  }));
};
