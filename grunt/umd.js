module.exports = {
    dist: {
        options: {
            src: "source/route_auth.js",
            dest: "dist/<%= pkg.name %>.js",
            amdModuleId: "<%= pkg.name %>"
        }
    }
};
