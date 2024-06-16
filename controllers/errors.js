const express = require('express');
const path = require('path');
const router = express.Router();

// List of supported image file extensions
const imageExtensions = ["ase", "art", "bmp", "blp", "cd5", "cit", "cpt", "cr2", "cut", "dds", "dib", "djvu", "egt", "exif", "gif", "gpl", "grf", "icns", "ico", "iff", "jng", "jpeg", "jpg", "jfif", "jp2", "jps", "lbm", "max", "miff", "mng", "msp", "nef", "nitf", "ota", "pbm", "pc1", "pc2", "pc3", "pcf", "pcx", "pdn", "pgm", "PI1", "PI2", "PI3", "pict", "pct", "pnm", "pns", "ppm", "psb", "psd", "pdd", "psp", "px", "pxm", "pxr", "qfx", "raw", "rle", "sct", "sgi", "rgb", "int", "bw", "tga", "tiff", "tif", "vtf", "xbm", "xcf", "xpm", "3dv", "amf", "ai", "awg", "cgm", "cdr", "cmx", "dxf", "e2d", "egt", "eps", "fs", "gbr", "odg", "svg", "stl", "vrml", "x3d", "sxd", "v2d", "vnd", "wmf", "emf", "art", "xar", "png", "webp", "jxr", "hdp", "wdp", "cur", "ecw", "iff", "lbm", "liff", "nrrd", "pam", "pcx", "pgf", "sgi", "rgb", "rgba", "bw", "int", "inta", "sid", "ras", "sun", "tga", "heic", "heif"];

// Handler for serving static image for 404 errors
router.get('*', (req, res, next) => {
  // Get the requested file path
  const filePath = req.path;
  
  // Get the file extension
  const fileExtension = path.extname(filePath).slice(1).toLowerCase(); // Remove the leading dot and convert to lowercase

  // Check if the requested file is an image
  if (imageExtensions.includes(fileExtension)) {
    // Send the static image file for 404 errors
    res.sendFile(path.join(__dirname, `../public/${process.env.THEME}/img/404.webp`)); // Adjust the file path as per your directory structure
  } else {
    // If not an image, proceed to render the 404 page
    next();
  }
});

// Handler for rendering the 404 page
router.get('*', (req, res) => {
  res.status(404).render('404', { title: '404 Page Not Found' });
});

module.exports = router;


