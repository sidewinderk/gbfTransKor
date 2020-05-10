import gsheets
import mergesheets

listOfFiles = ["archive", "name", "quest", "image"]

if(__name__ == '__main__'):
    gsheets.export_csv(gsheets.SHEET)
    for translist in listOfFiles:
        mergesheets.merge(translist,"./cache/","../data/")