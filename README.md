# Gokul portfolio

Static site: index.html, projects.html, services.html, contact.html, css/, js/. No build step.

## 1. Fill in your details
Open js/config.js and set your email, LinkedIn, GitHub, WhatsApp, project links and form endpoint. Anything left as "" stays hidden.

## 2. Make the contact form work
1. Create a free form at formspree.io with your email address.
2. Copy the form endpoint (looks like https://formspree.io/f/xxxxxxxx).
3. Paste it into `formAction` in js/config.js.
Test it once after the site is live and confirm the first email in your inbox.

## 3. Publish on GitHub Pages
1. Create a GitHub repository and upload all files (index.html at the top level).
2. Repository Settings > Pages > Deploy from a branch > main, root folder.
3. Your site appears at https://<username>.github.io/<repo>/. A custom domain can be added in the same Pages settings.
