<h5>LemmyTools 0.1.2.5</h5>
 
 0.1.2.5 - Fixed "," in community Array (Thanks Christoph-Wagner!)

* Fixed "," in community Array (Thanks Christoph-Wagner!)
* Removed dblclick open images event for post images (may re-implement later)
* Fixed mobile styling for hover area button (made it smaller)
* Added global (mobile variable).
* Cleaned up code (a bit).

0.1.2.4:
* Fixes mobile styling from 0.1.2.3 release.

New/Fixes: 0.1.2.3:
* Completely re-worked expanding images. Should be much better.
* LemmyTools Bar is hidden by default. Option added in settings to keep it open. Now all CSS.
* Removed scroll bars persisting in google chrome on LemmyTools bar.
* Message for homeInstance variable added to option page if not added.
* Elemenation of poor eventHandlers leads to much better perforamnce.
* old.reddit theme from soundjester/lemmy_monkey now being added from cdn instead of manually. 

 New/Fixes: 0.1.2.2
* Fixed Expanding Images (More reliable expanding (click and drag), Fixed issue of having to hide past expanded images to expand current image) 
* Adding Expanding Image Speed Control in options for fine tuning of expanding images.
* Removed Scroll Bars from LemmyTools Bar 
* Fixed CSS breaking community and profile icons/avatars
* Changed various defaults after further use.
* Changed styling.
   
   0.1.2.1 patch:
*  Fixed LTbar style funkiness on light themes.
*  Fixed default values for mobile bar vertical position.

   New for 0.1.2:
   <ul>
    <li>Auto-Expand and Click&Drag to expand lemmy images!</li>
    <li>Hide Lemmy Sidebars - More space for images on feed</li>
    <li>Auto unblur NSFW images option</li>
    <li>Option to enable old.Reddit (from https://github.com/soundjester/lemmy_monkey) - Thank you!</li>
    <li>Hover to activate lemmy Toolbar</li>
    <li>Significant UI changes</li>
    <li>Reworked easy button for offsite</li>
   </ul>
   <p> Fixes </p>
   <ul>
    <li>Fix for '#' breaking easy subscribe button</li>
    <li>Fix for script breaking other sites due to poor isLemmy implementation.</li>
    <li>Fixed memory allocation issue with eventHandlers</li>
    <li>Various UI bug fixes (not showing all communities, settings menu display, etc...)</li>
    
</ul>
    Script Features:
<ul>
    <li>Adds “Easy Subscribe” button to remote instance communities.</li>
    <li>Adds a collapsible sidebar on the side of screen that shows a searchable list of your subscribed communities.</li>
    <li>Adds link back to home instance and a community browser.</li>
    <li>Adds an options menu to configure LemmyTools settings.</li>
    
</ul>

</p>
<p>Feature for future releases:</p>
<ul>
    <li>When off site collect a list of communities and display in sidebar for easy subscription. (beginning implementation 0.1.2)</li>
    <li>Create communities grouping function.</li>
    <li>Sort sub list by recently visited</li>
    <li>Create addon for firefox/chrome.</li>
</ul>
<p>Installation and Configuration:</p>
<p>1 - Browser must have a Userscript addon (Tampermonkey, Greasemonkey, Etc...). Tested with Greasemonkey.</p>
<p>2 - Download either the .JS file or install from <a href="https://greasyfork.org/en/scripts/469169-lemmytools">greasyfork.</a></p></p>
<p>3 - Set home lemmy instance via options page once script is loaded (and manually edit the homeInstance variable for the offsite home instance fix.</p>
<p>This script is all done by a complete amateur for fun. Enjoy and feel free to fork it!</p>

<p>Get it here: <a href="https://github.com/howdy-tsc/LemmyTools">Github</a> or <a href="https://greasyfork.org/en/scripts/469169-lemmytools">GreasyFork</a></p>
<p><b></b>Please submit issues to the github for feature requests and problems: <a href="https://github.com/howdy-tsc/LemmyTools/issues">Github LemmyTools Issues</a></b></p>



ChangeLog:
0.1.2 - See above.
0.1.1 - Updated added settings menu, fixed new compatibility changes with lemmy 0.18.
0.1a - Initial Release



