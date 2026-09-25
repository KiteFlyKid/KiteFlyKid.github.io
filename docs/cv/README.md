# CV source

`resume.tex` is the main LaTeX source for Shang Ma's CV. It is self-contained and can be compiled with pdfLaTeX on Overleaf or with Tectonic locally.

From the repository root:

```sh
mkdir -p output/pdf
tectonic --outdir output/pdf docs/cv/resume.tex
cp output/pdf/resume.pdf assets/pdf/Shang_Ma_CV.pdf
```

Review the resulting PDF before publishing it. The website links to `assets/pdf/Shang_Ma_CV.pdf` from the CV page.

The layout follows the academic CV at https://jasonzhangzy1757.github.io/files/CV.pdf.
