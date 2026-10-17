---
layout: about
title: about
permalink: /
subtitle: PhD student · Computer Science and Engineering · University of Notre Dame
redirect_from: [/about/, /about.html]
profile:
  align: right
  image: shang-ma.jpg
  image_circular: false
  more_info: >
    <aside class="job-market-note" aria-label="Job market status">
      <p><strong>I am on the job market, open to industry roles and postdoc positions.</strong> <a href="mailto:sma5@nd.edu">Email me</a>, <a href="/assets/pdf/Shang_Ma_CV.pdf" download="Shang_Ma_CV.pdf">download CV</a>.</p>
    </aside>
selected_papers: false
social: true
announcements:
  enabled: false
latest_posts:
  enabled: false
---

<span id="about-me"></span>
I am **Shang Ma**, a PhD student in Computer Science and Engineering at the **University of Notre Dame**, advised by Prof. [Yanfang (Fanny) Ye](https://yes-lab.org/). I collaborate with Prof. [Xusheng Xiao](https://xusheng-xiao.github.io/) and [my lab mates](https://yes-lab.org/students.html).

My research focuses on building **structured AI to understand and defend against cyber fraud**. I ground AI in **graphs, code semantics, and human psychology** to analyze digital threats and support safer interactions for people and AI agents. My work spans two connected directions:

- **App and AI Agent Security:** Ad Fraud Detection ([NDSS ’25](https://www.ndss-symposium.org/ndss-paper/careful-about-what-app-promotion-ads-recommend-detecting-and-explaining-malware-promotion-via-app-promotion-graph/)), UI Agents for Software Testing ([arXiv](https://arxiv.org/abs/2604.03561), [AACL ’26](https://arxiv.org/abs/2510.06042)), UI Agent Security ([TAISAP](https://doi.org/10.1145/3807953)).
- **Online Scam Understanding and Defense:** Psychological Understanding ([EMNLP’25](https://aclanthology.org/2025.findings-emnlp.675/), [arXiv](https://arxiv.org/abs/2606.16052)), Real-Time Detection ([COLM ’26](https://arxiv.org/abs/2605.12243)), Timely Intervention ([arXiv](https://arxiv.org/abs/2606.16052)).

{% include scam_research.liquid compact=true %}

<h2 id="news">news</h2>

<span id="-news"></span>
<div class="news-scroll" role="region" aria-labelledby="news" tabindex="0">
  <ul class="news-list">
    <li><time datetime="2026-09">Sep 2026</time><span>Agent+P accepted to the <strong>AACL 2026 Main Conference</strong>.</span></li>
    <li><time datetime="2026-07">Jul 2026</time><span>PreScam accepted to <strong>COLM 2026</strong>.</span></li>
    <li><time datetime="2026-06">Jun 2026</time><span>Started a research internship in the <strong>Integrated Systems</strong> department at <strong>NEC Laboratories America, Princeton</strong>, working with <a href="https://www.nec-labs.com/research/integrated-systems/people/biplob-debnath/"><strong>Biplob Debnath</strong></a>.</span></li>
    <li><time datetime="2026-01">Jan 2026</time><span>Started a research internship in the <strong>Data Science &amp; System Security</strong> department at <strong>NEC Laboratories America, Princeton</strong>, working with <a href="https://www.nec-labs.com/research/data-science-system-security/people/wei-cheng/"><strong>Wei Cheng</strong></a>.</span></li>
    <li><time datetime="2025-12">Dec 2025</time><span>Selected for the <strong>Meta Bug Bounty: Abuse Track</strong>.</span></li>
    <li><time datetime="2025-08">Aug 2025</time><span>PsyScam accepted to <strong>EMNLP 2025</strong>.</span></li>
    <li><time datetime="2024-10">Oct 2024</time><span>Started a research visit to <strong>Curiosity Lab, National University of Singapore</strong>, working with <a href="https://www.comp.nus.edu.sg/~liangzk/">Zhenkai Liang</a>.</span></li>
    <li><time datetime="2024-09">Sep 2024</time><span>Our work on detecting malware promotion via app promotion graphs accepted to <strong>NDSS 2025</strong>.</span></li>
    <li><time datetime="2024-03">Mar 2024</time><span>Started a research visit to <strong>ASE Lab, Peking University</strong>, working with <a href="https://taoxiease.github.io/">Tao Xie</a>.</span></li>
    <li><time datetime="2022-08">Aug 2022</time><span>Began my PhD journey.</span></li>
  </ul>
</div>

## experience

{% include experience.liquid %}

<span id="-publications"></span>

<h2><a href="{{ '/publications/' | relative_url }}" style="color: inherit">selected publications</a></h2>

{% include selected_papers.liquid %}

## Recent Preprints

<div class="publications">
{% bibliography --group_by none --query @*[recent_preprint=true]* %}
</div>

---

<span id="-educations"></span>
I completed my undergraduate studies at **Wuyuzhang Honors College, Sichuan University**. Outside research, I enjoy road trips, going to the gym, and exploring history and military geography.

[Google Scholar](https://scholar.google.com/citations?user=kF1a5fqkO_EC) · [LinkedIn](https://www.linkedin.com/in/shang-ma-891898255/) · [Email](mailto:sma5@nd.edu) · <a href="{{ '/assets/pdf/Shang_Ma_CV.pdf' | relative_url }}" download="Shang_Ma_CV.pdf">CV</a>
