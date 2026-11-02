script_argument <- grep("^--file=", commandArgs(), value = TRUE)
if (length(script_argument) != 1) {
  stop("Run this file with Rscript.")
}

script_path <- normalizePath(sub("^--file=", "", script_argument), mustWork = TRUE)
repository_root <- normalizePath(file.path(dirname(script_path), ".."), mustWork = TRUE)
input_file <- file.path(repository_root, "assets", "data", "data_cv.Rmd")
output_dir <- tempfile("data-cv-render-")
dir.create(output_dir)
on.exit(unlink(output_dir, recursive = TRUE), add = TRUE)

rmarkdown::render(
  input = input_file,
  output_file = "data_cv.html",
  output_dir = output_dir,
  envir = new.env(parent = globalenv()),
  clean = TRUE,
  quiet = FALSE
)
