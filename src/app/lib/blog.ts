export type Article = {
  slug: string
  lang: 'fr' | 'en'
  title: string
  metaTitle: string
  metaDescription: string
  category: string
  readTime: number
  publishedAt: string
  content: string
}

export const ARTICLES: Article[] = [
  {
    slug: 'comment-ecrire-prompt-parfait-chatgpt',
    lang: 'fr',
    title: 'Comment écrire un prompt parfait pour ChatGPT',
    metaTitle: 'Comment écrire un prompt parfait pour ChatGPT — Guide 2026',
    metaDescription: 'Découvre les techniques de prompt engineering pour obtenir des résultats exceptionnels avec ChatGPT. Guide complet avec exemples concrets.',
    category: 'Guide',
    readTime: 7,
    publishedAt: '2026-04-20',
    content: `## Pourquoi la plupart des gens obtiennent de mauvais résultats avec ChatGPT

La majorité des utilisateurs de ChatGPT font la même erreur : ils posent des questions vagues et obtiennent des réponses génériques. La qualité de ta réponse dépend à 100% de la qualité de ton prompt.

Un prompt, c'est l'instruction que tu donnes à l'IA. Et comme tout outil, plus tu sais t'en servir, plus les résultats sont puissants.

## Le framework RCOFC pour écrire des prompts parfaits

Chez Prompt Architect, on utilise le framework **RCOFC** — la méthode la plus efficace pour structurer tes prompts :

### R — Rôle
Dis à l'IA qui elle doit être. Plus le rôle est précis, meilleure sera la réponse.

❌ "Écris un email"
✅ "Tu es un expert en copywriting B2B avec 10 ans d'expérience dans la vente SaaS"

### C — Contexte
Donne le contexte précis de ta situation. L'IA ne connaît pas ton business, ton audience, tes contraintes.

❌ "Pour mon entreprise"
✅ "Pour une startup SaaS de 5 personnes qui cible les PME françaises de 10-50 salariés dans le secteur RH"

### O — Objectif
Définis clairement ce que tu veux produire. Sois spécifique sur le résultat attendu.

❌ "Aide-moi avec mon marketing"
✅ "Génère 5 accroches pour une campagne LinkedIn ciblant les DRH de PME, avec un taux de clic minimum de 3%"

### F — Format
Précise comment tu veux que la réponse soit présentée. Liste, tableau, paragraphes, longueur exacte...

❌ Aucune indication de format
✅ "Présente le résultat sous forme de tableau avec 3 colonnes : Accroche / Pourquoi ça marche / CTA suggéré"

### C — Contraintes
Donne les règles et limites que l'IA doit respecter. Ton ton, ta charte, ce qu'il faut éviter...

❌ Aucune contrainte
✅ "Utilise un ton professionnel mais accessible, évite le jargon technique, maximum 150 mots par accroche"

## Exemple concret : avant et après

**AVANT (prompt basique) :**
"Écris un email de prospection pour mon logiciel RH"

**Résultat :** Un email générique inutilisable.

**APRÈS (prompt optimisé avec RCOFC) :**
"Tu es un expert en vente B2B SaaS avec 10 ans d'expérience. Contexte : Je vends un logiciel RH qui automatise la gestion des congés pour les PME de 10-100 salariés. Objectif : Écrire un email de prospection froid pour des DRH de PME industrielles en France. Format : Email en 3 parties — accroche personnalisée, valeur ajoutée, CTA clair. Maximum 200 mots. Contraintes : Ton direct, pas de jargon, une seule question en CTA, commence par un constat douloureux du prospect."

**Résultat :** Un email personnalisé, actionnable et qui convertit.

## Les 5 erreurs à éviter absolument

1. **Trop vague** — "Aide-moi avec mon marketing" ne donne rien de concret
2. **Sans contexte** — L'IA ne connaît pas ton business
3. **Sans format** — Tu obtiens n'importe quelle structure
4. **Trop long d'un coup** — Découpe en plusieurs prompts
5. **Pas de contraintes** — L'IA part dans tous les sens

## Pourquoi utiliser un générateur de prompts ?

Écrire un bon prompt prend du temps et de l'expérience. C'est pour ça qu'on a créé **Prompt Architect** — un générateur qui transforme ta demande simple en prompt expert en moins de 2 minutes.

Tu décris ton besoin en langage naturel, et notre IA génère un prompt structuré selon le framework RCOFC, optimisé pour obtenir les meilleurs résultats possibles.

## Conclusion

La différence entre un bon et un mauvais prompt, c'est la différence entre un employé qui comprend exactement ce que tu veux et un employé qui part dans la mauvaise direction. Prends le temps de structurer tes prompts avec RCOFC et tu verras immédiatement la différence dans la qualité des réponses.`,
  },
  {
    slug: '10-meilleurs-prompts-business-plan-ia',
    lang: 'fr',
    title: 'Les 10 meilleurs prompts pour créer un business plan avec l\'IA',
    metaTitle: '10 Meilleurs Prompts Business Plan IA — ChatGPT & Claude 2026',
    metaDescription: 'Découvre les 10 prompts les plus efficaces pour créer un business plan complet avec ChatGPT ou Claude. Exemples prêts à utiliser.',
    category: 'Business',
    readTime: 8,
    publishedAt: '2026-04-21',
    content: `## Créer un business plan avec l'IA : ce qui change tout

L'IA a révolutionné la création de business plans. Ce qui prenait des semaines à un consultant peut maintenant être réalisé en quelques heures — à condition d'avoir les bons prompts.

Voici les 10 prompts les plus efficaces que nous avons testés et validés chez Prompt Architect.

## Prompt 1 — Le résumé exécutif

**Utilisation :** Créer l'introduction percutante de ton business plan.

\`\`\`
Tu es un consultant en stratégie d'entreprise senior. Rédige un résumé exécutif percutant pour [NOM_PROJET], une [TYPE_ENTREPRISE] qui [DESCRIPTION_VALEUR]. Le marché cible est [AUDIENCE]. Notre avantage concurrentiel est [DIFFÉRENCIATEUR]. Format : 3 paragraphes de 100 mots maximum. Ton : professionnel et convaincant pour des investisseurs.
\`\`\`

## Prompt 2 — L'analyse de marché TAM/SAM/SOM

**Utilisation :** Structurer ton analyse de marché avec les métriques clés.

\`\`\`
Tu es un analyste de marché expert. Aide-moi à structurer l'analyse de marché pour [PRODUIT/SERVICE] dans [SECTEUR]. Calcule et explique : TAM (marché total adressable), SAM (marché adressable serviceable), SOM (marché obtainable). Inclus les sources de données à consulter et la méthodologie de calcul. Format tableau + explication.
\`\`\`

## Prompt 3 — L'analyse concurrentielle

**Utilisation :** Identifier et positionner ton offre face à la concurrence.

\`\`\`
Tu es un expert en stratégie compétitive. Pour [MON_PRODUIT] dans [SECTEUR], identifie les 5 principaux concurrents directs et indirects. Pour chaque concurrent, analyse : forces, faiblesses, positionnement prix, part de marché estimée, et opportunité de différenciation pour moi. Présente sous forme de tableau comparatif + recommandations stratégiques.
\`\`\`

## Prompt 4 — Le modèle financier

**Utilisation :** Projeter tes revenus et coûts sur 3 ans.

\`\`\`
Tu es un directeur financier d'une startup. Crée un modèle financier sur 3 ans pour [MON_BUSINESS] avec : Hypothèses de croissance (conservateur / réaliste / optimiste), projection MRR/ARR, coûts fixes et variables, point de break-even, besoin en financement. Base sur un lancement à [DATE] avec [BUDGET_INITIAL]. Format : tableaux mensuels année 1, trimestriels années 2-3.
\`\`\`

## Prompt 5 — La stratégie Go-To-Market

**Utilisation :** Définir ton plan de lancement et d'acquisition clients.

\`\`\`
Tu es un expert en growth marketing B2B/B2C. Crée une stratégie Go-To-Market complète pour [PRODUIT] ciblant [AUDIENCE]. Inclus : canaux d'acquisition prioritaires (organique + payant), stratégie de pricing, plan de lancement en 90 jours, KPIs à suivre, budget marketing recommandé. Adapte à une startup avec [BUDGET] de budget initial.
\`\`\`

## Prompt 6 — La proposition de valeur

**Utilisation :** Définir et affiner ton pitch de valeur unique.

\`\`\`
Tu es un expert en positionnement de marque. Aide-moi à formuler ma proposition de valeur unique pour [PRODUIT]. Mon client cible est [PERSONA] qui souffre de [PROBLÈME]. Ma solution [DESCRIPTION] leur permet de [BÉNÉFICE]. Mes concurrents proposent [ALTERNATIVE] mais [MON_DIFFÉRENCIATEUR]. Génère 5 formulations différentes de ma proposition de valeur, du plus court (tagline) au plus détaillé (pitch 30 secondes).
\`\`\`

## Prompt 7 — La stratégie de pricing

**Utilisation :** Définir ta structure tarifaire optimale.

\`\`\`
Tu es un expert en stratégie de pricing SaaS/produit. Pour [MON_PRODUIT] dans [SECTEUR], recommande une structure tarifaire optimale. Analyse : pricing par valeur vs coût vs concurrence, modèle freemium vs payant, nombre de tiers recommandés, psychologie du prix, et impact sur la conversion. Justifie chaque recommandation avec des exemples du secteur.
\`\`\`

## Prompt 8 — L'analyse SWOT

**Utilisation :** Cartographier forces, faiblesses, opportunités et menaces.

\`\`\`
Tu es un consultant stratégique. Réalise une analyse SWOT complète pour [MON_PROJET] dans [SECTEUR]. Pour chaque quadrant, liste 5 éléments concrets et actionnables (pas génériques). Inclus une matrice de priorisation et des recommandations stratégiques basées sur l'analyse. Termine par 3 priorités stratégiques pour les 6 prochains mois.
\`\`\`

## Prompt 9 — Le plan opérationnel

**Utilisation :** Définir les ressources et processus nécessaires.

\`\`\`
Tu es un COO expérimenté. Crée un plan opérationnel pour lancer [MON_BUSINESS] en [DÉLAI]. Inclus : équipe nécessaire (rôles + timing de recrutement), outils et infrastructure, processus clés à mettre en place, risques opérationnels et mitigation, jalons importants. Adapté à une équipe de [TAILLE_ÉQUIPE] avec [BUDGET_OPÉRATIONNEL].
\`\`\`

## Prompt 10 — Le pitch deck exécutif

**Utilisation :** Structurer ta présentation pour les investisseurs.

\`\`\`
Tu es un expert en levée de fonds qui a accompagné 50+ startups. Structure mon pitch deck pour [MON_PROJET] en 10 slides optimales pour des investisseurs Series A. Pour chaque slide : titre, contenu clé, métriques à mettre en avant, et ce que l'investisseur doit retenir. Adapte au secteur [SECTEUR] et au montant recherché de [MONTANT].
\`\`\`

## Comment utiliser ces prompts efficacement

1. **Remplace tous les éléments entre crochets** par tes informations spécifiques
2. **Commence par le résumé exécutif** pour clarifier ta vision
3. **Itère** — demande à l'IA d'approfondir les sections importantes
4. **Combine les résultats** pour créer un business plan cohérent

Pour obtenir des prompts encore plus précis et adaptés à ton projet, utilise **Prompt Architect** — notre générateur IA crée des prompts sur mesure pour ton business plan en moins de 2 minutes.`,
  },
  {
    slug: 'prompts-ia-videos-virales-tiktok-2026',
    lang: 'fr',
    title: 'Les meilleurs prompts IA pour créer des vidéos virales sur TikTok en 2026',
    metaTitle: 'Meilleurs Prompts IA Vidéos Virales TikTok 2026 — Guide Complet',
    metaDescription: 'Découvre les prompts IA les plus efficaces pour créer des vidéos virales sur TikTok en 2026. Scripts, hooks, et stratégies testées.',
    category: 'Contenu Viral',
    readTime: 7,
    publishedAt: '2026-04-22',
    content: `## Pourquoi l'IA est devenue indispensable pour TikTok

En 2026, les créateurs qui utilisent l'IA pour générer leurs scripts TikTok publient 3x plus de contenu et obtiennent des taux d'engagement significativement supérieurs. La raison est simple : l'IA peut analyser des milliers de vidéos virales et distiller ce qui fonctionne vraiment.

Voici les prompts les plus efficaces pour créer du contenu viral sur TikTok.

## Le hook — les 3 premières secondes qui font tout

Sur TikTok, 70% des viewers décident de rester ou partir dans les 3 premières secondes. Le hook est donc l'élément le plus critique de ta vidéo.

### Prompt Hook Viral

\`\`\`
Tu es un expert en contenu viral TikTok avec 5 millions d'abonnés. Génère 10 hooks d'accroche pour une vidéo sur [SUJET]. Chaque hook doit : créer une curiosité immédiate, promettre une valeur claire, être dit en moins de 3 secondes, utiliser un pattern de viralité (statistique choc, question provocante, contre-intuition, confession). Format : liste numérotée avec le hook + pourquoi il fonctionne psychologiquement.
\`\`\`

## Les structures narratives qui fonctionnent en 2026

### Prompt Structure "Problème-Solution-Résultat"

\`\`\`
Tu es un scriptwriter TikTok viral. Écris un script de 60 secondes sur [SUJET] avec la structure : 0-5s : Hook choc qui cible [DOULEUR_AUDIENCE], 5-15s : Aggraver le problème avec une statistique ou anecdote, 15-45s : Solution en 3 étapes actionnables, 45-55s : Résultat concret et crédible, 55-60s : CTA fort avec urgence. Ton : [TONALITÉ]. Audience : [CIBLE].
\`\`\`

### Prompt Structure "Storytelling Personnel"

\`\`\`
Tu es un créateur de contenu expert en storytelling. Transforme cette anecdote [ANECDOTE] en script TikTok viral de 45-60 secondes. Structure : accroche émotionnelle → contexte rapide → moment de tension → révélation ou leçon → CTA. Inclus les indications de montage (coupe, zoom, texte à l'écran) et le moment exact où chaque transition doit avoir lieu.
\`\`\`

## Les prompts pour chaque niche TikTok

### Pour la niche Business/Entrepreneuriat

\`\`\`
Tu es un entrepreneur qui a généré [MONTANT] en [DÉLAI]. Crée 5 scripts TikTok viraux qui révèlent des "secrets" sur [SUJET_BUSINESS]. Chaque script : 30-45 secondes, commence par une statistique ou révélation surprenante, donne une valeur actionnable, termine par un CTA vers [OBJECTIF]. Ton : authentique, direct, sans filtre.
\`\`\`

### Pour la niche Lifestyle/Productivité

\`\`\`
Tu es un expert en productivité avec une communauté de 2M d'abonnés. Génère 5 concepts de vidéos TikTok virales sur [THÈME_PRODUCTIVITÉ]. Pour chaque concept : titre accrocheur, hook d'ouverture, structure en 3 points, visuels suggérés, son/musique tendance recommandé, hashtags optimisés. Format adapté aux algorithmes TikTok 2026.
\`\`\`

### Pour la niche Food/Recettes

\`\`\`
Tu es un créateur food TikTok avec 3M d'abonnés. Crée le script d'une vidéo virale sur [RECETTE/PLAT]. Inclus : hook visuel d'ouverture (le résultat final), liste des ingrédients en format dynamique, étapes filmées avec timing exact, astuces "chef secret" pour créer de l'engagement, CTA pour sauvegarder la vidéo. Durée : 45-60 secondes.
\`\`\`

## Les prompts pour maximiser l'engagement

### Prompt Commentaires et Débat

\`\`\`
Tu es un stratège de contenu viral. Pour ma vidéo sur [SUJET], génère : 3 formulations de fin de vidéo qui déclenchent des commentaires (question clivante, défi, opinion controversée), 5 réponses types aux commentaires négatifs pour transformer les haters en engagement positif, et une stratégie de "pinned comment" pour booster l'algorithme.
\`\`\`

### Prompt Série de Contenu

\`\`\`
Tu es un créateur TikTok stratège. Crée un plan de contenu pour une série de 10 vidéos sur [THÈME]. Pour chaque vidéo : titre, hook, concept, durée, connexion avec les autres épisodes pour créer de la dépendance. L'objectif est de créer une série que les viewers veulent suivre jusqu'au bout. Inclus les stratégies pour annoncer le prochain épisode.
\`\`\`

## Les hashtags et timing optimaux

### Prompt Stratégie Hashtags

\`\`\`
Tu es un expert en algorithme TikTok 2026. Pour une vidéo sur [SUJET] ciblant [AUDIENCE], génère une stratégie de hashtags complète : 3 hashtags très populaires (+1B vues), 4 hashtags de niche (100M-1B vues), 3 hashtags ultra-ciblés (<100M vues). Explique pourquoi ce mix maximise la portée organique et inclus les hashtags tendance du moment.
\`\`\`

## Conclusion : l'IA comme co-créateur

Les meilleurs créateurs TikTok de 2026 n'utilisent pas l'IA pour remplacer leur créativité — ils l'utilisent pour l'amplifier. L'IA génère les structures et les variations, toi tu apportes l'authenticité et le point de vue unique.

Utilise **Prompt Architect** pour générer des scripts TikTok optimisés en quelques secondes. Notre module "Contenu Viral" est spécialement conçu pour les créateurs qui veulent passer à l'échelle supérieure.`,
  },
  {
    slug: 'prompt-script-youtube-ia',
    lang: 'fr',
    title: 'Comment écrire un prompt parfait pour générer des scripts YouTube avec l\'IA',
    metaTitle: 'Prompts IA Scripts YouTube — Guide Complet 2026',
    metaDescription: 'Apprends à écrire des prompts parfaits pour générer des scripts YouTube viraux avec ChatGPT et Claude. Exemples et templates inclus.',
    category: 'Contenu Viral',
    readTime: 8,
    publishedAt: '2026-04-23',
    content: `## YouTube en 2026 : pourquoi l'IA change la donne

YouTube reste la plateforme de contenu long format la plus puissante au monde. Mais créer un script YouTube engageant prend du temps — généralement 4 à 8 heures pour une vidéo de 10 minutes. Avec les bons prompts IA, tu peux réduire ce temps à 30 minutes.

## La structure d'un script YouTube qui performe

Avant de voir les prompts, comprends la structure qui maximise la rétention :

1. **Hook (0-30s)** — Accroche immédiate qui promet une valeur
2. **Intro (30s-2min)** — Contexte et crédibilité
3. **Corps (2min-85%)** — Contenu principal structuré
4. **Conclusion (10%)** — Récap + CTA

## Prompt 1 — Le script complet optimisé rétention

\`\`\`
Tu es un scriptwriter YouTube professionnel spécialisé en [NICHE] avec une chaîne à 500K abonnés. Écris un script complet pour une vidéo YouTube de [DURÉE] minutes sur [SUJET]. Structure obligatoire : Hook en 30 secondes qui promet [VALEUR], intro avec ma crédibilité sur le sujet, [NOMBRE] points principaux avec transition entre chaque, exemples concrets pour chaque point, conclusion avec récap et CTA pour s'abonner. Audience cible : [DESCRIPTION_AUDIENCE]. Optimise pour un taux de rétention supérieur à 60%.
\`\`\`

## Prompt 2 — Le hook YouTube irrésistible

\`\`\`
Tu es un expert en psychologie de l'attention et créateur YouTube avec 1M d'abonnés. Génère 10 hooks d'ouverture pour une vidéo sur [SUJET]. Chaque hook doit tenir en 20-30 secondes, utiliser l'un de ces patterns : statistique choc, histoire personnelle dramatique, question rhétorique provocante, démonstration visuelle, promesse de révélation. Indique pour chaque hook le type de montage recommandé.
\`\`\`

## Prompt 3 — Les titres optimisés pour le CTR

\`\`\`
Tu es un expert en SEO YouTube et psychologie du clic. Pour ma vidéo sur [SUJET], génère 15 titres optimisés pour maximiser le taux de clic. Chaque titre doit : être entre 50-60 caractères, inclure le mot-clé principal [MOT_CLÉ], utiliser un pattern de curiosité ou bénéfice clair, éviter le clickbait tout en créant de l'anticipation. Classe les par potentiel de CTR estimé.
\`\`\`

## Prompt 4 — La miniature et le concept visuel

\`\`\`
Tu es un expert en design de miniatures YouTube qui a analysé 10 000 thumbnails viraux. Pour ma vidéo intitulée [TITRE], décris en détail : la composition idéale de la miniature (éléments, placement, couleurs), le texte à inclure (maximum 4 mots), l'expression faciale et la posture si une personne apparaît, les couleurs qui maximisent le CTR dans la niche [NICHE]. Inclus 3 variantes de concept.
\`\`\`

## Prompt 5 — La description SEO optimisée

\`\`\`
Tu es un expert en SEO YouTube 2026. Rédige une description complète pour ma vidéo sur [SUJET]. Inclus : paragraphe d'accroche avec le mot-clé principal dans les 2 premières lignes, timestamps de la vidéo (je te donnerai la structure), liste des ressources mentionnées, section FAQ avec 5 questions courantes sur [SUJET], hashtags optimisés, et CTA pour s'abonner et activer la cloche.
\`\`\`

## Prompt 6 — L'analyse de la concurrence

\`\`\`
Tu es un analyste YouTube expert. Pour créer une vidéo sur [SUJET] qui se démarque, analyse ce qui manque dans les vidéos existantes sur ce thème. Identifie : les angles non couverts, les questions que les viewers posent dans les commentaires mais auxquelles personne ne répond, le format idéal (tutoriel, vlog, essai, liste), la durée optimale selon la niche. Base ton analyse sur les meilleures pratiques YouTube 2026.
\`\`\`

## Prompt 7 — Le script de fin optimisé abonnements

\`\`\`
Tu es un expert en conversion YouTube. Rédige 5 versions de conclusion pour ma vidéo sur [SUJET]. Chaque conclusion doit : récapituler la valeur délivrée en 30 secondes, créer une transition naturelle vers l'abonnement, teasé la prochaine vidéo pour créer l'anticipation, inclure un CTA spécifique et naturel. Adapte le ton à [MA_PERSONNALITÉ/STYLE].
\`\`\`

## Les erreurs à éviter dans tes prompts YouTube

1. **Ne pas spécifier la durée** — Un script de 5 minutes et un de 20 minutes sont très différents
2. **Oublier l'audience** — L'IA doit savoir qui regarde
3. **Pas de style précisé** — Éducatif, entertainment, storytelling : chaque format a ses codes
4. **Ignorer le SEO** — Mentionne le mot-clé principal dans ton prompt

## Conclusion

Créer des scripts YouTube avec l'IA n'est pas de la triche — c'est de l'efficacité. Les meilleurs créateurs utilisent l'IA comme assistant de recherche et de structure, puis y ajoutent leur personnalité unique.

**Prompt Architect** dispose d'un module spécialement conçu pour générer des scripts YouTube optimisés. En 2 minutes, obtiens un script structuré et prêt à filmer.`,
  },
  {
    slug: 'prompt-engineering-reseaux-sociaux-guide',
    lang: 'fr',
    title: 'Prompt engineering pour les réseaux sociaux : le guide complet',
    metaTitle: 'Prompt Engineering Réseaux Sociaux — Guide Complet 2026',
    metaDescription: 'Maîtrise le prompt engineering pour créer du contenu viral sur Instagram, TikTok, LinkedIn et YouTube. Guide complet avec exemples.',
    category: 'Guide',
    readTime: 10,
    publishedAt: '2026-04-24',
    content: `## Le prompt engineering appliqué aux réseaux sociaux

Chaque réseau social a ses propres codes, formats et psychologies d'engagement. Un prompt qui fonctionne pour LinkedIn sera catastrophique sur TikTok. Voici le guide complet pour maîtriser le prompt engineering par plateforme.

## Instagram — L'art du visuel et du caption

### La psychologie Instagram

Instagram est une plateforme d'aspiration et d'esthétique. Les captions qui performent le mieux créent soit de l'émotion, soit de la valeur actionnable.

### Prompt Caption Instagram Engagement

\`\`\`
Tu es un expert en marketing Instagram avec 2M d'abonnés. Rédige 5 captions pour une photo/vidéo sur [SUJET] ciblant [AUDIENCE]. Chaque caption doit : commencer par une ligne d'accroche qui force le "more", délivrer une valeur ou émotion en 150-200 mots, inclure un CTA naturel (question, sauvegarde, partage), et se terminer par des hashtags stratégiques (30 max). Varie les styles : éducatif, inspirationnel, storytelling, controversé, humour.
\`\`\`

### Prompt Story Instagram Séquence

\`\`\`
Tu es un stratège de contenu Instagram Stories. Crée une séquence de 7 stories sur [SUJET] pour [OBJECTIF : vente/engagement/trafic]. Pour chaque story : texte principal (max 3 lignes), sticker interactif recommandé (sondage, question, slider), visuel suggéré, et lien avec la story suivante pour maximiser la rétention. Inclus une story de CTA final optimisée.
\`\`\`

## TikTok — La vitesse et l'authenticité

### La psychologie TikTok

TikTok récompense l'authenticité, la rapidité et les émotions fortes. L'algorithme favorise la complétion de visionnage et les partages.

### Prompt TikTok Série Virale

\`\`\`
Tu es un créateur TikTok avec 5M d'abonnés dans la niche [NICHE]. Crée un concept de série en 5 épisodes sur [THÈME]. Pour chaque épisode : hook d'ouverture (3 secondes), contenu principal (30-45 secondes), cliffhanger pour le prochain épisode, son/musique tendance recommandé. Objectif : créer une dépendance narrative qui force à suivre la série complète.
\`\`\`

## LinkedIn — La plateforme B2B par excellence

### La psychologie LinkedIn

LinkedIn favorise les posts qui génèrent des commentaires. Les posts qui exposent une vulnérabilité ou partagent un apprentissage concret surperforment.

### Prompt Post LinkedIn Viral

\`\`\`
Tu es un expert LinkedIn avec 50 000 abonnés qui génère 500K impressions par mois. Rédige un post LinkedIn viral sur [SUJET] pour [AUDIENCE_PROFESSIONNELLE]. Structure obligatoire : première ligne choc sans point final (pour forcer le "voir plus"), développement en paragraphes courts (max 3 lignes chacun), liste de points actionnables si pertinent, question finale qui invite au commentaire. Maximum 1300 caractères. Ton : [PERSONNEL/EXPERT/INSPIRANT].
\`\`\`

### Prompt Stratégie Commentaires LinkedIn

\`\`\`
Tu es un growth hacker LinkedIn. Pour mon post sur [SUJET], génère : 10 questions à poster en commentaire pour relancer l'engagement, 5 réponses types aux réactions négatives qui transforment l'opposition en débat constructif, et une stratégie de "commenting" sur d'autres posts pour augmenter ma visibilité de 200% en 30 jours.
\`\`\`

## YouTube — Le long format qui convertit

### Prompt Stratégie Chaîne YouTube

\`\`\`
Tu es un consultant YouTube qui a fait passer 10 chaînes de 0 à 100K abonnés. Crée une stratégie de contenu sur 90 jours pour ma chaîne sur [NICHE]. Inclus : calendrier de publication hebdomadaire, 12 idées de vidéos classées par potentiel viral, stratégie de mots-clés pour le référencement, plan de collaboration avec d'autres créateurs, et les 3 premières vidéos à créer absolument.
\`\`\`

## Twitter/X — La concision qui frappe

### Prompt Thread Twitter Viral

\`\`\`
Tu es un expert Twitter avec 100K abonnés. Crée un thread de 15 tweets sur [SUJET]. Tweet 1 : hook qui promet la valeur complète du thread, Tweets 2-13 : un insight actionnable par tweet (max 280 caractères chacun), Tweet 14 : récapitulatif visuel ou liste, Tweet 15 : CTA pour suivre + question engageante. Chaque tweet doit pouvoir fonctionner seul ET créer l'envie de lire le suivant.
\`\`\`

## La stratégie cross-platform

### Prompt Adaptation Multi-Plateformes

\`\`\`
Tu es un expert en stratégie de contenu omnicanal. J'ai créé ce contenu sur [PLATEFORME_ORIGINALE] : [CONTENU]. Adapte-le pour : TikTok (script 60 secondes), LinkedIn (post 1000 mots), Instagram (caption + story), Twitter (thread 10 tweets), YouTube Shorts (script 60 secondes). Pour chaque adaptation, respecte les codes et la psychologie spécifique de chaque plateforme.
\`\`\`

## Conclusion

Le prompt engineering pour les réseaux sociaux n'est pas une formule magique — c'est une compétence qui s'affine avec la pratique. Commence par maîtriser une plateforme, puis élargis progressivement.

**Prompt Architect** génère automatiquement des prompts optimisés pour chaque réseau social. Notre module "Contenu Viral" te permet de créer du contenu adapté à chaque plateforme en quelques minutes.`,
  },
  {
    slug: 'claude-ai-productivite-guide',
    lang: 'fr',
    title: 'Comment utiliser Claude AI pour booster ta productivité',
    metaTitle: 'Claude AI Productivité — Guide Complet 2026',
    metaDescription: 'Découvre comment utiliser Claude AI pour multiplier ta productivité. Prompts, cas d\'usage et stratégies testées et validées.',
    category: 'Guide',
    readTime: 8,
    publishedAt: '2026-04-25',
    content: `## Claude AI : l'IA qui change vraiment la donne

Claude, développé par Anthropic, est aujourd'hui considéré comme l'un des modèles d'IA les plus capables pour les tâches complexes. Sa capacité à suivre des instructions précises, à analyser des documents longs et à produire du contenu nuancé en fait un outil de productivité exceptionnel.

Voici comment l'utiliser concrètement pour multiplier ta productivité.

## Cas d'usage 1 — La rédaction professionnelle

Claude excelle dans la rédaction de tout type de contenu professionnel. Emails, rapports, propositions commerciales — il s'adapte à ton style et ton secteur.

### Prompt Email Professionnel

\`\`\`
Tu es mon assistant personnel expert en communication professionnelle. Rédige un email [OBJECTIF : prospection/relance/négociation] pour [DESTINATAIRE] à propos de [SUJET]. Contexte : [CONTEXTE_RELATION]. Ton ton habituel : [TON]. Objectif de l'email : [RÉSULTAT_SOUHAITÉ]. Maximum [NOMBRE] mots. Inclus [ÉLÉMENTS_SPÉCIFIQUES].
\`\`\`

## Cas d'usage 2 — L'analyse de documents

Claude peut analyser des documents complexes — rapports financiers, contrats, études de marché — et en extraire les informations clés en secondes.

### Prompt Analyse Document

\`\`\`
Analyse ce document [COLLER_DOCUMENT] et fournis : les 5 points clés à retenir, les risques ou opportunités identifiés, les actions recommandées, et les questions qui méritent d'être approfondies. Format : bullet points concis avec priorité décroissante.
\`\`\`

## Cas d'usage 3 — La recherche et synthèse

Pour la veille concurrentielle, la préparation de réunions ou la recherche d'informations, Claude est un assistant de recherche puissant.

### Prompt Veille Concurrentielle

\`\`\`
Tu es un analyste business expert. À partir de ces informations sur [CONCURRENT] : [INFORMATIONS], réalise une analyse compétitive qui couvre : positionnement marché, forces et faiblesses, stratégie apparente, opportunités pour moi, menaces à anticiper. Conclus par 3 recommandations stratégiques actionnables.
\`\`\`

## Cas d'usage 4 — La planification et organisation

Claude peut t'aider à planifier des projets complexes, décomposer des objectifs ambitieux en tâches concrètes, et créer des systèmes de productivité personnalisés.

### Prompt Plan de Projet

\`\`\`
Tu es un chef de projet senior. Pour atteindre [OBJECTIF] d'ici [DATE], crée un plan de projet détaillé avec : décomposition en phases et jalons, liste des tâches par priorité, ressources nécessaires, risques et plan de mitigation, indicateurs de succès. Adapté à [TAILLE_ÉQUIPE] personnes avec [CONTRAINTES].
\`\`\`

## Cas d'usage 5 — Le brainstorming et la créativité

Quand tu es bloqué sur un problème ou que tu manques d'idées, Claude peut générer des dizaines d'options en quelques secondes.

### Prompt Brainstorming

\`\`\`
Tu es un consultant créatif sans limites. Pour [PROBLÈME/DÉFI], génère 20 idées radicalement différentes — du très conservateur au totalement disruptif. Pour chaque idée : description en 2 lignes, avantage principal, risque principal, et faisabilité sur une échelle de 1-10. Inclus 3 idées "folles" qui challengent les conventions du secteur [SECTEUR].
\`\`\`

## Les 5 astuces pour maximiser Claude

### 1. Donne-lui un rôle précis
Claude performe mieux quand tu lui assignes un rôle d'expert spécifique. "Tu es un..." change radicalement la qualité des réponses.

### 2. Itère et affine
Ne te contente pas de la première réponse. Demande des variations, des approfondissements, ou des reformulations jusqu'à obtenir exactement ce que tu veux.

### 3. Fournis du contexte
Plus tu donnes de contexte (ton secteur, ton audience, tes contraintes), plus les réponses seront pertinentes et personnalisées.

### 4. Demande un format précis
Tableau, liste, paragraphes, bullet points — spécifie toujours le format de sortie pour gagner du temps en post-traitement.

### 5. Utilise des prompts structurés
La différence entre un prompt basique et un prompt structuré peut représenter des heures de travail économisées.

## Conclusion

Claude AI est bien plus qu'un chatbot — c'est un véritable assistant de travail qui peut transformer ta productivité si tu sais l'utiliser correctement. La clé : des prompts précis et structurés.

Pour obtenir des prompts Claude optimisés pour chaque cas d'usage professionnel, **Prompt Architect** génère automatiquement des instructions expertement formulées pour tirer le maximum de Claude et autres IA.`,
  },
  {
    slug: 'prompts-linkedin-engagement',
    lang: 'fr',
    title: 'Les meilleurs prompts LinkedIn pour 10x ton engagement',
    metaTitle: 'Meilleurs Prompts LinkedIn Engagement 2026 — Guide Complet',
    metaDescription: 'Découvre les prompts LinkedIn les plus efficaces pour multiplier ton engagement par 10. Templates et stratégies pour créateurs et professionnels.',
    category: 'Contenu Viral',
    readTime: 7,
    publishedAt: '2026-04-26',
    content: `## LinkedIn en 2026 : la plateforme B2B incontournable

LinkedIn est devenu la plateforme de référence pour les professionnels, entrepreneurs et créateurs B2B. Avec plus d'un milliard d'utilisateurs, le potentiel de visibilité est immense — mais l'algorithme favorise certains types de contenus spécifiques.

## Comprendre l'algorithme LinkedIn 2026

LinkedIn favorise les posts qui génèrent rapidement des commentaires dans les 60 premières minutes. Voici les types de contenus qui surperforment :

1. Posts qui exposent une vulnérabilité ou un échec
2. Posts avec des insights contre-intuitifs
3. Posts qui posent une question clivante
4. Listes d'apprentissages concrets
5. Stories personnelles avec leçon professionnelle

## Les prompts qui font exploser l'engagement

### Prompt 1 — Le Post "Contre-Intuition"

\`\`\`
Tu es un expert LinkedIn avec 100K abonnés dans [SECTEUR]. Rédige un post viral basé sur une vérité contre-intuitive sur [SUJET]. Structure : affirmation choc en première ligne (sans point final), développement en 5 paragraphes courts qui prouvent l'affirmation, liste de 3 implications pratiques, question finale qui invite au débat. Ton : confiant, direct, basé sur l'expérience. Maximum 1300 caractères.
\`\`\`

### Prompt 2 — Le Post "Leçon d'Échec"

\`\`\`
Tu es un entrepreneur authentique sur LinkedIn. Transforme cet échec/erreur [DÉCRIRE_SITUATION] en post LinkedIn viral. Structure : context de l'échec en 2 lignes, ce que j'ai perdu ou raté, les 3 leçons concrètes que j'en ai tirées, comment j'aurais fait différemment, question pour que la communauté partage ses expériences similaires. Ton : vulnérable mais constructif.
\`\`\`

### Prompt 3 — Le Carrousel LinkedIn

\`\`\`
Tu es un expert en contenu carrousel LinkedIn. Crée un carrousel de 10 slides sur [SUJET] pour [AUDIENCE_PROFESSIONNELLE]. Slide 1 : titre accrocheur + promesse de valeur, Slides 2-9 : un insight actionnable par slide avec titre + 3 lignes max + icône suggerée, Slide 10 : récapitulatif + CTA pour suivre. Design suggéré : minimaliste, couleurs [COULEURS_MARQUE].
\`\`\`

### Prompt 4 — La Newsletter LinkedIn

\`\`\`
Tu es un expert en newsletters LinkedIn avec 30K abonnés. Rédige un article newsletter sur [SUJET] pour [AUDIENCE]. Structure : titre SEO optimisé, intro qui promet la valeur en 3 lignes, 4 sections principales avec sous-titres, encadré "ce qu'il faut retenir", CTA pour s'abonner. Longueur : 800-1000 mots. Ton : expert mais accessible.
\`\`\`

### Prompt 5 — La Stratégie de Commenting

\`\`\`
Tu es un growth hacker LinkedIn. Crée une stratégie de commenting pour augmenter ma visibilité sur [SUJET]. Inclus : 10 types de commentaires qui apportent de la valeur (pas juste "super post !"), comment identifier les posts influents dans ma niche, timing optimal pour commenter, comment transformer un commentaire en conversation et en connexion. Objectif : +500 abonnés en 30 jours.
\`\`\`

### Prompt 6 — Le Post "Données et Étude"

\`\`\`
Tu es un analyste qui vulgarise des données complexes sur LinkedIn. À partir de ces données [DONNÉES/STATISTIQUES], rédige un post LinkedIn engageant qui : transforme les chiffres en insights actionnables, utilise une visualisation textuelle simple (si pertinent), donne le contexte pour que le lecteur comprenne l'impact sur [SECTEUR], et pose une question sur les implications futures.
\`\`\`

## La stratégie de publication optimale

### Timing
- **Mardi, mercredi, jeudi** : meilleures journées
- **7h-9h et 12h-13h** : pics d'engagement
- **Publier 3-4 fois par semaine** maximum pour maintenir la qualité

### Le protocole des 60 premières minutes
1. Publie ton post
2. Réponds à chaque commentaire dans les 60 minutes
3. Commente 5-10 posts d'influenceurs de ta niche
4. Engage avec ceux qui ont réagi à tes anciens posts

### Prompt Calendrier Editorial LinkedIn

\`\`\`
Tu es un stratège de contenu LinkedIn. Crée un calendrier éditorial de 4 semaines pour un profil dans [SECTEUR] ciblant [AUDIENCE]. Pour chaque post (3 par semaine) : jour et heure de publication, format (texte/carrousel/article/sondage), sujet et angle spécifique, hook d'ouverture, type d'engagement visé (commentaires/partages/réactions). Varie les formats et thèmes pour maintenir l'intérêt.
\`\`\`

## Conclusion

LinkedIn est une plateforme qui récompense la consistance et l'authenticité. Les prompts ci-dessus te donnent la structure — à toi d'y ajouter ton expérience et ta personnalité unique.

**Prompt Architect** dispose d'un module spécialement conçu pour LinkedIn — génère des posts optimisés en quelques secondes et multiplie ton engagement par 10.`,
  },
  {
    slug: 'best-ai-prompts-viral-videos-tiktok-reels-2026',
    lang: 'en',
    title: 'Best AI Prompts to Create Viral Videos on TikTok and Instagram Reels 2026',
    metaTitle: 'Best AI Prompts Viral TikTok Instagram Reels 2026',
    metaDescription: 'Discover the most effective AI prompts to create viral videos on TikTok and Instagram Reels in 2026. Ready-to-use templates and examples.',
    category: 'Viral Content',
    readTime: 8,
    publishedAt: '2026-04-27',
    content: `## Why AI-Generated Scripts Dominate Short-Form Video in 2026

The top 1% of TikTok and Instagram Reels creators share a secret: they use AI to generate, test, and iterate on content faster than anyone else. Not to replace creativity, but to amplify it.

The difference between viral and invisible content often comes down to structure. AI helps you nail that structure every single time.

## Understanding What Makes Short-Form Video Go Viral

Before diving into prompts, understand the three pillars of viral short-form content:

1. **Hook** (0-3 seconds): Stop the scroll instantly
2. **Value Delivery**: Give more than expected in the shortest time
3. **Loop/Retention**: Make viewers watch again or engage

## The Ultimate Hook Generator Prompt

The hook is everything. If your first 3 seconds don't work, nothing else matters.

\`\`\`
You are a viral content strategist who has studied 50,000 TikTok videos with over 1 million views. Generate 15 opening hooks for a video about [TOPIC]. Each hook must: create immediate curiosity or tension, be deliverable in under 3 seconds, use one of these proven patterns: shocking statistic, bold claim, relatable struggle, counter-intuitive truth, or direct challenge. Format: hook + psychological trigger used + estimated retention potential (1-10).
\`\`\`

## Niche-Specific Viral Prompts

### For Business and Finance Creators

\`\`\`
You are a finance content creator with 3M followers known for making complex topics simple and viral. Write a 60-second TikTok script about [FINANCIAL_TOPIC] for [AUDIENCE]. Requirements: open with a money-related hook that creates FOMO or curiosity, explain the concept using a real-world analogy, include one actionable tip viewers can implement today, end with a CTA that drives comments. Keep sentences under 10 words. Energy: urgent, credible, accessible.
\`\`\`

### For Fitness and Wellness Creators

\`\`\`
You are a fitness creator who consistently goes viral by combining science with entertainment. Create a 45-second Reels script about [FITNESS_TOPIC] that: opens with a common fitness myth being busted, reveals the science-backed truth in simple language, demonstrates with a specific example or before/after concept, ends with a "save this" moment. Include: suggested visuals, text overlays, and trending sound type to use.
\`\`\`

### For Education and How-To Creators

\`\`\`
You are a educational content creator known for the "learn something in 60 seconds" format with 5M views per video. Create a script teaching [SKILL/CONCEPT] in under 60 seconds. Structure: hook that promises a specific transformation, step 1 with visual cue, step 2 with visual cue, step 3 with visual cue, result reveal, CTA to follow for more. Every sentence must be a maximum 8 words. Make it feel like the viewer just unlocked a cheat code.
\`\`\`

## The Trend-Jacking Prompt

One of the fastest ways to go viral is to attach your content to existing trends.

\`\`\`
You are a social media trend analyst and content strategist. For the current trending format [DESCRIBE_TREND_FORMAT] on TikTok/Reels, adapt this trend to create content about [YOUR_TOPIC]. Maintain the essence of what makes the original trend work while making it relevant to [YOUR_NICHE]. Generate 3 different adaptations, from most safe to most creative. Include: script, suggested audio, on-screen text, and estimated virality score.
\`\`\`

## The Comment-Bait Prompt

Getting comments is the #1 signal that boosts your content in the algorithm.

\`\`\`
You are an engagement psychology expert specializing in short-form video. For my video about [TOPIC], create: 5 different ending CTAs that naturally trigger comments (ranking from most to least effective), a "this or that" debate angle that makes viewers choose sides, a fill-in-the-blank statement viewers will answer in comments, and a controversial opinion related to [TOPIC] that sparks healthy debate without being offensive.
\`\`\`

## The Series Architecture Prompt

Series content creates loyal followers who come back every day.

\`\`\`
You are a Netflix-level content strategist applied to short-form video. Design a 7-episode TikTok/Reels series about [TOPIC] that creates addiction. For each episode: title, hook, main content (45-60 seconds), cliffhanger for next episode, and the emotional journey viewers experience throughout the series. The series should work both as standalone videos AND create FOMO for those who miss an episode.
\`\`\`

## Optimizing for the Algorithm: Technical Prompts

### Caption Optimization Prompt

\`\`\`
You are a TikTok/Instagram algorithm expert in 2026. For my video about [TOPIC] targeting [AUDIENCE], write: an optimized caption that includes natural keyword placement, a question that drives genuine comments, 3 relevant hashtag clusters (popular + niche + micro), and a call-to-action that doesn't sound robotic. The caption should feel human-written while being algorithmically optimized.
\`\`\`

## Conclusion

The creators winning on TikTok and Instagram Reels in 2026 aren't necessarily the most talented — they're the most consistent and strategic. AI prompts give you the structure to be both.

Use **Prompt Architect** to generate optimized video scripts for TikTok and Instagram Reels in seconds. Our Viral Content module is specifically built for creators who want to scale their content production without sacrificing quality.`,
  },
  {
    slug: 'chatgpt-prompts-viral-youtube-scripts',
    lang: 'en',
    title: 'How to Write ChatGPT Prompts for Viral YouTube Scripts',
    metaTitle: 'ChatGPT Prompts Viral YouTube Scripts — Complete Guide 2026',
    metaDescription: 'Learn how to write ChatGPT prompts that generate viral YouTube scripts. Templates, examples, and proven strategies for content creators.',
    category: 'Viral Content',
    readTime: 9,
    publishedAt: '2026-04-28',
    content: `## The YouTube Script Problem Every Creator Faces

Writing a YouTube script is one of the most time-consuming parts of content creation. A well-researched, engaging 10-minute video script can take 6-8 hours to write from scratch. But creators who master AI prompting can cut that time to under an hour — while actually improving quality.

The secret isn't just asking ChatGPT to "write a script." It's knowing exactly how to structure your prompts for YouTube-specific content.

## What Makes a YouTube Script Different

YouTube has unique retention mechanics that separate it from other platforms:

- **Average watch time** matters more than views
- **Chapters and structure** affect SEO and engagement
- **The "why should I care" must be answered** in the first 30 seconds
- **Pattern interrupts** every 90-120 seconds maintain attention

Your AI prompts must account for all of these factors.

## The Master YouTube Script Prompt

Start with this comprehensive prompt and customize it:

\`\`\`
You are a professional YouTube scriptwriter who specializes in [NICHE] and has written scripts for channels with 100K-5M subscribers. Write a complete script for a [DURATION]-minute YouTube video titled "[VIDEO_TITLE]". 

Requirements:
- Hook: 30-second opening that creates immediate intrigue
- Intro: 60-90 seconds establishing credibility and video roadmap
- Main content: [NUMBER] key sections with smooth transitions
- Pattern interrupts: Include 3-4 moments that re-engage drifting viewers
- Chapters: Clear chapter markers for YouTube chapters feature
- End screen CTA: 30-second conclusion optimized for subscriptions

Target audience: [DESCRIBE_AUDIENCE]
Tone: [EDUCATIONAL/ENTERTAINING/INSPIRATIONAL]
Optimize for: [WATCH_TIME/COMMENTS/SHARES]
\`\`\`

## Hook Writing: The Make-or-Break Moment

### The Curiosity Gap Hook Prompt

\`\`\`
You are an expert in the psychology of curiosity and YouTube retention. Generate 10 opening hooks for a YouTube video about [TOPIC]. Each hook must create a curiosity gap — the viewer must feel they're missing critical information they need to know. Hooks should be 20-30 seconds when spoken aloud. Rate each hook's estimated click-to-retention ratio and explain the psychological mechanism driving it.
\`\`\`

### The Story Hook Prompt

\`\`\`
You are a master storyteller trained in screenwriting and YouTube content strategy. Create a compelling story-based hook for a video about [TOPIC]. The story should: start in the middle of action (in medias res), create immediate emotional investment, be relatable to [TARGET_AUDIENCE], and naturally lead into the main topic. Duration when spoken: 45-60 seconds. Include directions for b-roll footage suggestions.
\`\`\`

## SEO-Optimized Title and Description Prompts

### Title Generation Prompt

\`\`\`
You are a YouTube SEO expert who has analyzed 100,000 viral titles. For a video about [TOPIC] targeting the keyword [MAIN_KEYWORD], generate 20 title variations. Include: titles optimized for search, titles optimized for curiosity clicks, titles with numbers and lists, titles with emotional triggers. Mark the top 3 recommendations with reasoning. All titles must be under 60 characters and include the main keyword naturally.
\`\`\`

### Description Optimization Prompt

\`\`\`
You are a YouTube SEO specialist. Write a complete video description for a video about [TOPIC]. Include: keyword-rich opening paragraph (first 150 characters are critical), timestamps for each chapter, links section with descriptions, extended keyword-rich content (500+ words) that expands on the video topic naturally, social media links section, and end with a subscribe CTA. Target keyword: [KEYWORD]. Secondary keywords: [LIST_KEYWORDS].
\`\`\`

## Thumbnail Concept Prompts

### Thumbnail Concept Generator

\`\`\`
You are a YouTube thumbnail designer who has A/B tested 10,000 thumbnails. For a video titled "[VIDEO_TITLE]" in the [NICHE] space, design 5 thumbnail concepts. For each concept describe: main visual element, facial expression if human (be specific: raised eyebrow + open mouth showing shock, etc.), text overlay (max 4 words), color scheme, composition layout, and what psychological trigger drives the click. Rank by expected CTR.
\`\`\`

## Audience Retention Techniques

### Pattern Interrupt Prompt

\`\`\`
You are a YouTube retention specialist. For my video script about [TOPIC], suggest 6 pattern interrupt techniques to use throughout the video that re-engage viewers who are losing attention. Each pattern interrupt should: work within the context of my video content, add genuine value (not just be gimmicky), be filmable with [MY_EQUIPMENT/SETUP]. Include the exact script moment where each should be inserted.
\`\`\`

### The Re-Engagement Hook Prompt

\`\`\`
Write 10 "mini-hooks" to use at the 2-minute, 4-minute, 6-minute, and 8-minute marks of my video about [TOPIC]. These mini-hooks should remind viewers why they're watching and what's coming next, while delivering enough immediate value that they stay. Each mini-hook should be 15-20 seconds and reference something specific coming later in the video.
\`\`\`

## The Complete Content System

### Monthly Content Calendar Prompt

\`\`\`
You are a YouTube growth strategist who specializes in [NICHE]. Create a 30-day content calendar for a YouTube channel targeting [AUDIENCE]. For each of the 4 weekly videos include: video concept and angle, target keyword, estimated search volume category, hook concept, thumbnail concept, expected performance type (search traffic vs. browse traffic vs. suggested). Balance the calendar between SEO-driven and viral-potential content.
\`\`\`

## Common Prompting Mistakes to Avoid

1. **Asking for generic scripts** — Always specify your niche, audience, and tone
2. **Ignoring duration** — A 5-minute script structure differs completely from 20 minutes
3. **Forgetting the platform context** — YouTube rewards different things than TikTok
4. **Not iterating** — The first output is rarely the final version; always refine
5. **Missing SEO elements** — Always include keyword targets in your prompts

## Conclusion

Writing viral YouTube scripts with AI is a learnable skill. The prompts above give you the framework — your unique perspective and expertise provide the soul.

**Prompt Architect** generates optimized YouTube scripts tailored to your niche, audience, and goals. Stop spending hours on scripts and start creating. Our AI-powered generator produces professional-grade YouTube content in minutes.`,
  },
]
