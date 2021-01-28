# D3-trends-visualization. Basic Folder
Shows a scatter plot between two data variables analyzing the current trends shaping people's lives such as Healthcare vs. Poverty or Smokers vs. Age.

The data contains a series of feature stories about the health risks facing particular demographics. The idea is to sniff out the first story idea by sifting through information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.

The data set included with the assignment is based on 2014 ACS 1-year estimates:
[https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml](https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml). The current data set incldes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

Using D3 techniques, I created a scatter plot that represents each state with circle elements. The scatter appears like the image shown here.
![scatter](images/scatter.png)

* Include state abbreviations in the circles.

* Create and situate your axes and labels to the left and bottom of the chart.


# D3-trends-visualization. Adv Folder

Following the same idea from the basic folder. 
I created an interactive chart with animations. The results of this part will look similar to next gif image.

![animated-scatter](images/animated-scatter.gif)

It includes additional labels in the scatter plot and gives them click events so that users can decide which data to display. The animation consists of transitions for the circles' locations changing the range of the axes.
