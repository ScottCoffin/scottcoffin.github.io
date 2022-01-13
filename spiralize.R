#### SPIRALIZE ####
## Inspired by W.E.B. Dubois ###
## Tutorial: https://flowingdata.com/2022/01/10/a-quick-and-easy-way-to-make-spiral-charts-in-r/ ##

#install.packages("spiralize")
library("spiralize")

#load data from https://github.com/owid/covid-19-data/tree/master/public/data
covid <- read.csv("_data/owid-covid-data.csv", stringsAsFactors = FALSE)

#Subset to just the United States, and create a column dt, which is a Date-Time object version of the date column:
us <- covid[covid$location == "United States" & !is.na(covid$new_cases_smoothed),]
us$dt <- strptime(us$date, format="%Y-%m-%d")

#To match the NYT version, also subset to dates prior to January 7, 2022:
us <- us[us$dt < "2022-01-07",]

#Get the maximum case count:
ymax <- max(us$new_cases_smoothed)

#Make spiral
#Initialize the spiral by setting the time range (January 1, 2020 to January 6, 2022), the units of time (days), and what each spiral round means (years):
  
  # Initialize.
spiral_initialize_by_time(xlim=c("2020-01-01 00:00:00", "2022-01-06 00:00:00"),
                            unit_on_axis = "days", period="years",
                            start=90, end=(709/365)*360+(28/365)*360+90,
                            flip="horizontal")
#The start argument indicates that the spiral should start at 90 degrees. The end argument indicates in degrees where the spiral ends. Here’s what you get:

#Then create the “track” of the spiral. This is where you specify the range of the data. If you’re thinking in Cartesian coordinates instead of polar, it’s like setting the y-range in your plot.

# Create the track.
spiral_track(ylim=c(0, ymax*.7),
             background=FALSE, background_gp = gpar(col = NA, fill = NA))

#Then draw the polygon, which puts half the case count on the bottom and the other half on top:
  # Use a polygon.
spiral_polygon(x=c(us$dt, rev(us$dt)),
                 y=c(us$new_cases_smoothed/2, -rev(us$new_cases_smoothed/2)),
                 gp = gpar(col="#d32e2b", fill="#d32e2b50"))

# Middle baseline.
spiral_lines(x=us$dt, y=0)

#At this point, I’d export and bring into Adobe Illustrator to edit, which I’m pretty sure is what Wezerek and Chodosh did. But the spiralize package also provides a spiral_text() function if you want:
  # Text.
spiral_text(x="2020-01-01", y=50000, text="2020",
              facing = "curved_inside", just = "right",
              gp=gpar(cex=1, fontfamily="Courier"))
spiral_text(x="2021-01-01", y=50000, text="2021",
            facing = "curved_inside", just = "right",
            gp=gpar(cex=1, fontfamily="Courier"))
spiral_text(x="2022-01-01", y=50000, text="2022",
            facing = "curved_inside", just = "right",
            gp=gpar(cex=1, fontfamily="Courier"))


