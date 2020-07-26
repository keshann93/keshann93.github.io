
# The difference between git reset — mixed, — soft and — hard

When a modification to an existing file in your repository is made, this change is initially considered as unstaged. In order to commit the changes, it needs to be staged which means adding it to the index using git add. During a commit operation, the files that are staged gets added to an index.

Let’s take an example:

    - A - B - C (master)

HEAD points to C and the index matches C.

## — soft

* When we execute git reset --soft B with the intention of **removing the commit C** and **pointing the master/HEAD to B**.

* The master/HEAD will now point to B, but the **index still has changed from C**.

* When executing git status you could see the files indexed in **commit C** as **staged**.

* Executing a git commit at this point will create a new commit with **the same changes as C**

## — mixed

* Execute git reset --mixed B.

* On execution, master/HEAD will point to B and the **index is also modified to match B** because of the mixed flag used.

* If we run git commit at this point, nothing will happen since the **index matches HEAD**.

* We still have the changes in the working directory, but since they’re not in the index, **git status shows them as unstaged**.

* To commit them, you would git add and then commit as usual.

## — hard

* Execute git reset --hard B

* On execution, master/HEAD will point to B **and modifies your working directory**

* The **changes added in C** and **all the uncommitted changes** will be **removed**.

* Files in the working copy will match the commit B, this will result in loosing permanently all changes which were made in commit C plus uncommitted changes

Hope this comparison of flags that are available to use with git reset will help someone to use them wisely. Refer these for further details [link1](https://gist.github.com/tnguyen14/0827ae6eefdff39e452b) & [link2](https://stackoverflow.com/questions/3528245/whats-the-difference-between-git-reset-mixed-soft-and-hard)
