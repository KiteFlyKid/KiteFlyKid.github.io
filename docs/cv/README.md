# CV source

`resume.tex` is the main LaTeX source for Shang Ma's CV. It is self-contained and can be compiled with pdfLaTeX on Overleaf or with Tectonic locally.

From the repository root:

```sh
mkdir -p output/pdf
tectonic --outdir output/pdf docs/cv/resume.tex
```

The generated PDF stays in `output/pdf/`, which is ignored by Git and excluded from the website. CV downloads have been removed from the site. The former public path `assets/pdf/Shang_Ma_CV.pdf` is also ignored and excluded so local copies are not published. This LaTeX source may differ from the PDF previously supplied separately.

The layout follows the academic CV at https://jasonzhangzy1757.github.io/files/CV.pdf.
