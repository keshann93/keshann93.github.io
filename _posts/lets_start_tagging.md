
# Lets start tagging!



This story will pretty much cover everything that you need to know about Git tags and its usage. Lets get started!

## Tagging — what does that even mean🙄

A git tag refers to a specific point in time in Git history of your repository. Though I mention as “specific point in time”, they really represent a specific commit. In general, tags are used to capture a state in git to be used as a marked version release (i.e. v1.0.2). A tag won’t be having any further commits since its creation unlike branches. These tags gets stored as a file in **refs **folder within the **.git** folder that comes within every git repository.

Below sections would cover in detail how git tag works, types of them, discussion on usage in real world scenarios and followed with frequent tag commands used.

## Why? 🤔

We can easily relate tags to “bookmarks” which will refer a specific commit. You can checkout to them just like branches in git but you cannot make any further changes/commits, it will only refer a particular state of the repository and it remains same until it gets deleted or overridden.

When working on a project with a team consisting of developers or a module developed that is used by different other projects, there comes situation where we may want to release an update that has to break something (not backward compatible).

To make life easier we should start versioning the project properly. With proper versioning, it would be possible to always have backward compatibility.

And it’s easy to do with git tags and semantic versioning.

## Types of tags

### Annotated Tags
> git tag -a v1.4

Looking at the above git command, you might be wondering why -a flag is used in the command. This instructs git to create an “annotated tag” that not only stores name but also meta information, which includes a date, person adding tag and any message/description provided. These information might considered as useful for others, hence we exclusively use annotated tags.

Additionally, for security, annotated tags can be signed and verified with GNU Privacy Guard (GPG). Suggested best practices for git tagging is to prefer annotated tags over lightweight so you can have all the associated meta-data.
> git tag -a v1.4 -m “my version 1.4”

Executing this command is similar to the previous invocation, however, this version of the command is passed the -m option and a message. This is a convenience method similar to git commit -m that will immediately create a new tag and forgo opening the local text editor in favor of saving the message passed in with the -m option.

### Lightweight Tags
> git tag v1.4 -lw

Executing this command creates a lightweight tag identified as v1.4 -lw. Lightweight tags are created with the absence of the -a, -s, or -m options. Lightweight tags create a new tag checksum and store it in the .git/ directory of the project's repo.

We can use git show command to see what git knows about our tags. This new tag, called “lightweight”, doesn’t store any information apart from those already in the commit.

### Let’s share

What good are our tags if we only store them locally? We have to **push them to the repository** for others to see. We, obviously, use git push for pushing and simply provide tag name as an argument. In our case we want to execute git push origin v1 (again, just like branches).

If we have more than one tag we can push all of them at once with git push origin --tags. However, we have to be careful as this command **pushes all tags **automatically (remember to clean up any mess before pushing).

### Let’s watch some tags

We can already create and push tags. At some point, we may want to also see what tags are already present in the repository. To do this we can simply execute git tag and see all of them. If we’re looking for specific ones there is a simple search option with -l flag. To find all tags ending with “-test” we can do git tag -l *-test*.

## Tagging like a pro

At first, our v1 tag seemed like a good idea, but in the future, we will see v2, v3, etc. In the meantime, there will be some bugs so we will get v3-fixed or maybe v3.1. At some point, it will be hard to keep things consistent 🤷‍

This problem can be solved with [semantic versioning](https://semver.org/). That’s one of the popular standards that uses a few simple rules. Every version is formatted as MAJOR.MINOR.PATCH and each part changes according to the following rules.

We increment:

1. MAJOR when **breaking backward compatibility,**

1. MINOR when adding a new feature which doesn’t break compatibility,

1. PATCH when fixing a bug without breaking compatibility

## Frequent git tag commands

<iframe src="https://medium.com/media/ba925924fd3d2d99d529e284e1c58911" frameborder=0></iframe>

## Summary

Let’s summarize the story, we learnt about tagging as an additional mechanism that will help to create a snap shot of a Git repo. Tagging helps to create identifiers based on semantic version number that will represent the software release cycles. The git tag command comes with set of operation that includes: creation, modification and deletion. Two types of tags are defined; annotated and lightweight. It’s recommended to use annotated tags which would have additional valuable information related to tag.
