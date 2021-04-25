import setuptools

h = setuptools.Extension(
        "h",
        sources=["./h_module.cpp"]
)
setuptools.setup(
    name="h",
    version="1.0",
    author="jiricekcz",
    license="MIT",
    ext_modules=[h],
    packages=["h"]
)