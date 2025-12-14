---
layout: post
title:  "Advanced Git Continued part 2"
date:   2022-03-14 12:01:05
categories: git tools productivity bash  
---



### Interactive Rebase
 Use interactive rebasing
- use when ready to merge a feature branch into dev or master
- don't use interactive rebase on commits that you've already pushed to remote branch
- use to clean local commit before merging into shared branch

```bash

git rebase -i HEAD~3 // this will go down 3



// squashing 2 commits together

git rebase -i HEAD~4


// when popup opens
pick ..... 
squash ebjdifjd 

```


### Cherry-Picking
Use Cherry-pick when you've commited to the wrong branch

1. checkout to the suppose branch the commit is supposed to land on.
2. `git cherry-pick 8704d0f` to add the commit to the branch
3. then git reset hard on the branch which doesn't need to have that commit



### Reflog

`git reflog`

if you've deleted some commits that contains key information, you can use reflog to get the commit hash and restore those commit's on another branch `git branch new-code 9479fbe`

You can also use reflog to restore deleted branches
1. git reflog
2. then copy the hashcode and `git branch feature/login 3099dfd`

### Submodules

Used to seperate library files or vendor files from your project. The files are downloaded on your local to work with, but are not part of your parent remote project. 

1. create a vendor / module / lib folder to host those files and cd into that folder
2. add a submodule by `git submodule add remoteurl of that repo`



**Installing modules from a cloned repo**

1. Clone the repo
2. Initialize the submodules `git submodule update --init --recursive`
3.  or we can clone directory with installing modules by doing `git clone --recursive-submodules https://github.com/apache/whatever`
4. submodules is checkout from a specific commit, revision but not from a branch


### Search & Find in git


##### By Date `--before/ --after`

```bash
git log --after="2021-7-1"

git log --after="2021-7-1" --before="2021-7-5"

```
<br>

##### By Message `--grep`

```bash
git log --grep="refactor"
```
<br>

##### By Author `--author`

```bash

git log --author="kofi ramos"

```

<br>
##### By File `--<filename>`

```bash
git log -- Readme.md
```
<br>
##### By Branch `<branch-A>`

```bash
git log feature/login..main
```
