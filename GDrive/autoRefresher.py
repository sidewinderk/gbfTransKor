import gsheets
import mergesheets

listOfFiles = ["archive", "name", "quest", "image","battle"]

if(__name__ == '__main__'):
    for sht in gsheets.SHEETS:
        gsheets.export_csv(sht)
    #gsheets.export_csv(gsheets.SHEET)
    for translist in listOfFiles:
        mergesheets.merge(translist,"../cache/","../data/")
