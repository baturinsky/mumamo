import esbuild from "esbuild";
import open from "open";

let options = {
  entryPoints: ["src/main.ts"],
  bundle: true,
  sourcemap: true,
  outfile: "./dist/bundle.js",
  minify: false  
};

let builder;
let keys = new Set(process.argv.filter(k=>k.substring(0,2)=="--").map(k=>k.substring(2)));
if (keys.has("serve")) {
  builder = esbuild.serve(
    {
      servedir: "dist",
      port: 3100,
      onRequest: (r) => {
        console.log(r);
      }
    }, {...options, watch:false})
} else if(keys.has("minify")){
  builder = esbuild.build({...options, minify: true});
} else {
  builder = esbuild.build(options);
}

builder
  .catch(error => {
    console.error(error);
    process.exit(1)
  })
  .then(result => {
    console.log(result);
    //if (keys.has("serve")) open("http://localhost:3100/")
  });


