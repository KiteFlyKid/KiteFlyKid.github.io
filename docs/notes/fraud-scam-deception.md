# Fraud, Scam, Deception

## Fraud vs. scam

Let’s start with two examples:

1. **Fraud:** someone steals your login credentials and transfers your money without your permission.
2. **Scam:** someone tricks you into transferring it yourself, maybe by pretending to be your partner or promising amazing investment returns.


### Fraud ->"detection"

In the first example, fraud happens without your knowledge or consent. This is more of a system issue. As a computer science researcher, I focus on designing systems to detect it.

- **[AdGPE](https://www.ndss-symposium.org/ndss-paper/careful-about-what-app-promotion-ads-recommend-detecting-and-explaining-malware-promotion-via-app-promotion-graph/):** explore apps, collect promotion ads, and study the connections between apps to detect malware spreading through those ads.
- **[ADWISE](https://arxiv.org/abs/2604.03561), [Agent+P](https://arxiv.org/abs/2510.06042):** use program analysis and planning to guide LM-based GUI agents, supporting my broader goal of identifying fraud in apps.

### Scams->"deception"

Scams trick you into authorizing the action yourself.

Computer science alone won’t answer all of that. I also draw on psychology and studies with people:

- **[PsyScam](https://aclanthology.org/2025.findings-emnlp.675/):** understand the psychological tricks used in scams.
- **[PreScam](https://arxiv.org/abs/2605.12243):** study how scams unfold across conversations and anticipate what comes next.


## How far back does this go?

Way before the internet. Here are two series of scams:

**Counterfeit goods**

- **[Around 164 BCE](https://zh.wikisource.org/zh-hans/%E6%BC%A2%E6%9B%B8/%E5%8D%B7004):** [Xinyuan Ping’s forged objects](https://www.theworldofchinese.com/2023/03/how-ancient-chinese-scammers-tricked-consumers/) fooled a Han-dynasty emperor.
- **1916:** [Clark Stanley sold “snake oil” medicine](https://digirepo.nlm.nih.gov/ext/fdanj/fdnj/cases/fdnj04944/fdnj04944.pdf) whose claims didn’t hold up.
- **2026:** a [BBB report about fake Nike shoes](https://www.bbb.org/scamtracker/lookupscam/1329506) describes a consumer losing $139 on allegedly counterfeit shoes.

**Advance-fee scams**

- **1898:** Rich [Spanish Prisoner](https://en.wikipedia.org/wiki/Spanish_Prisoner) promises to give you money.
- **1980s :** Rich [Nigerian Prince](https://thereader.mitpress.mit.edu/a-brief-history-of-the-internets-favorite-scam/) promises to give you money.
- **2021:** Super rich [Elon Musk](https://www.ftc.gov/news-events/data-visualizations/data-spotlight/2021/05/cryptocurrency-buzz-drives-record-investment-scam-losses) promised to give you money.

"Scam" is a big problem along the human history, and our work provides one angle. Some parts evolve, like the channels: word of mouth, mail, phone calls, and social media. Other parts stay similar. As computer science researchers, we use natural language processing and data mining to study these patterns.

# Common Questions

## Why understand the deception? Why not just detect and block it?

Fair question. Blocking a payment can stop an immediate loss, but the person may still believe the scammer.

Think of the movie *孤注一掷* (*No More Bets*): someone gets so invested in the story that people trying to stop them become obstacles. If that belief stays intact, they may simply find another way to send the money.

Explaining the tricks could help. In [one experiment](https://www.finrafoundation.org/sites/finrafoundation/files/2024-10/can-educational-interventions-reduce-susceptibility-to-financial-fraud_0_0.pdf), teaching common investment-scam tactics made people less willing to invest in fraudulent offers. The effect faded, but reminders helped. That supports the idea, without proving it can pull someone out of an ongoing scam.

Also, the rising of social media and LLMs make generate and distribute scams  substaintially cheaper and safer. It is impossible to block every scam/scammer.

## How are scams different from phishing?

Phishing is one type of scam. A typical example is one-shot: you click a link, download malware, or go to a website to transfer money. Some phishing attacks involve longer exchanges too.

Many real-world scams are more complex, gradually manipulating victims and causing serious emotional and financial losses. We study how these scams unfold in [PreScam](https://arxiv.org/abs/2605.12243).
