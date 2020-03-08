# Crowdsourcing against COVID-19

This was my project for [HackTech 2020](https://hacktech.io/), which was moved to a virtual hackathon because of Coronavirus. I still had fun, and I appreciate all the organizers and sponsors for following through with a great event. For more information about my project or the other projects at HackTech 2020, please see the [Devpost](https://devpost.com/software/crowdsourcing-against-covid-19) page!

## Inspiration
COVID-19 has taken the world by storm in the early months of 2020. It's upended families, companies, and economies in a matter of months. This virus will likely have a lasting impact on the way we operate and think about future pandemics — natural or man-made. Without access to information about the virus, the situation can feel a lot scarier than what reality reflects. It can also be difficult to stay safe and avoid getting sick without the most accurate and up-to-date information. That is why I built **Crowdsourcing against COVID-19** during HackTech 2020. 

## What it does
**Crowdsourcing against COVID-19** is a platform that allows users to anonymously post questions related to COVID-19. Then, other users of the platform can submit answers **with links to the source information**. Users can agree or disagree with answers. Depending on how many users agree with an answer (and the ratio of agree votes to disagree votes), a single answer may be promoted to the accepted answer for all to see.

## How I built it
The tech stack for **Crowdsourcing against COVID-19** is relatively simple. The front-end is built with React.js and interfaces with Firebase Firestore because of its real-time database capabilities. I was excited to find out that I did not need to build out a backend service for the early stages of this project. Finally, I deployed via surge.

## Accomplishments that I'm proud of
I'm proud of completing this project by myself despite HackTech 2020 being a virtual event. The motivation waxed and waned throughout the event, but I'm proud of what I was able to accomplish.

## What I learned
I learned how to integrate database (Google Firebase) interactions directly into frontend code. I started to look into using Algolia for indexed-search, but I ultimately ran out of time and used keyword search built into Firebase. This is more nuanced and not directly technical, but I also discovered how many important product decisions go into building a platform like this — I can more reasonably empathize with the product teams that work on similar platforms. 

## What's next for Crowdsourcing against COVID-19
I believe that **Crowdsourcing against COVID-19** is usable in its current state. However, it _could_ definitely use a few more features, some refinement, and some backend work to make everything more efficient. More specifically, here are a few features that are up next.

- Introducing the concept of users to track progress, contributions, etc. However, I'm passionate about the platform remaining anonymous.
- Better search implementation using Algolia or ElasticSearch
- Creating the "recency" or "best-match" algorithms to surface questions most relevant to specific users
