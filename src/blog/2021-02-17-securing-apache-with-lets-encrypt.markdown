---
title: Securing apache with lets encrypt
layout: post
date: 2021-02-17
categories: domain devops
---



## Securing apache with letsencrypt [source](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-18-04)

1. add certbot repository `sudo add-apt-repository ppa:certbot/certbot`
2. installing certbot package `sudo add-apt-repository ppa:certbot/certbot`
3. obtaining ssl certificate for your domain `sudo certbot --apache -d your_domain -d www.your_domain`
4. verify certbot renewal `sudo systemctl status certbot.timer`
5. renew `sudo certbot renew --dry-run`