import axios from "axios";

const token = "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";
const domain =
    "https://cpb-new-developer.myshopify.com/admin/api/2023-10/graphql.json";
const URL = `${domain}`;

let headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": String(token),
};

const axiosInstance = axios.create({
    baseURL: URL,
    headers: headers,
});

export function getProducts() {
    return axiosInstance.post("/", { query: getAlsoLikeProducts() });
}

function getAlsoLikeProducts() {
    return `
            query {
            products(first:20) {
                edges {
                    node {
                        title
                        id
                        bodyHtml
                        images(first: 1) {
                            edges {
                                node {
                                    transformedSrc
                                    altText
                                }
                            }
                        }
                    }
                }
            }
            }
           
        
    `;
}
