import sanitizeHtml from "sanitize-html";

const sanitizeHtmlData = (req, res, next) => {
  // Define allowed tags and attributes (adjust as needed)
  const allowedTags = [];
  const allowedAttributes = {
    a: [],
  };

  // Sanitize request body
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = sanitizeHtml(req.body[key], {
          allowedTags,
          allowedAttributes,
        });
      }
    }
  }

  // Sanitize request params
  if (req.params) {
    for (const key in req.params) {
      if (typeof req.params[key] === "string") {
        req.params[key] = sanitizeHtml(req.params[key], {
          allowedTags,
          allowedAttributes,
        });
      }
    }
  }

  // Sanitize request headers (be cautious about modifying headers)
  // if (req.headers) {
  //   for (const key in req.headers) {
  //     if (typeof req.headers[key] === 'string') {
  //       req.headers[key] = sanitizeHtml(req.headers[key], { allowedTags, allowedAttributes });
  //     }
  //   }
  // }

  next();
};

export default sanitizeHtmlData;
