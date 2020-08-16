# gsheets.py - download all sheets of a google docs spreadsheet as csv
# Moified by SideWinderk(sidewinderk@gmail.com)
# source: xflr6/gsheets.py 
# https://gist.github.com/xflr6/57508d28adec1cd3cd047032e8d81266

import contextlib, csv, os
from apiclient.discovery import build  # pip3 install google-api-python-client
skipsheets = ['archive','quest','name','image','battle']
savepath = "../cache/"

SHEET = '1LQiu94RhA5gRlcOja0oMrtRKfql14yCvJZlpa25xvi0'
SHEETS = [
	'1LQiu94RhA5gRlcOja0oMrtRKfql14yCvJZlpa25xvi0', # Main sheet
	'1UxSdJN8_bDZokoQXjIieTyGtuCM9TIxfCyj99HOolOE', # Main stroy
	'1XjrDTz8eUMWHVHD1C_Gym0jIdyNYVYATqW2qm9HvgfU', # Event story
	'1x2T-fH_06kSKbyXecFEiTPqcmxR3KiIxQwmiXJV9D68', # Fate story
	'1vvzihYl_A2JqsujzY3PeOweWTnc7CPd14IZ1lCIoW1s', # Other story
        '16J4ABot4fLP_YRfvjnSoLYOMk5XMF_4xGyj_yfUJVXc' # Battle text
]

def get_credentials(scopes, secrets='credentials.json', storage='storage.json'):
     from oauth2client import file, client, tools
     store = file.Storage(os.path.expanduser(storage))
     creds = store.get()
     if creds is None or creds.invalid:
         flow = client.flow_from_clientsecrets(os.path.expanduser(secrets), scopes)
         flags = tools.argparser.parse_args([])
         creds = tools.run_flow(flow, store, flags)
     return creds

def itersheets(id):
    doc = service.spreadsheets().get(spreadsheetId=id).execute()
    title = doc['properties']['title']
    sheets = [s['properties']['title'] for s in doc['sheets']]
    params = {'spreadsheetId': id, 'ranges': sheets, 'majorDimension': 'ROWS'}
    result = service.spreadsheets().values().batchGet(**params).execute()
    for name, vr in zip(sheets, result['valueRanges']):
        for item in skipsheets:
           if item not in name:
               continue
           try:
               yield (title, name), vr['values']
           except:
               print("Exception on checking sheet")
               continue
#        if(name not in skipsheets):
#            continue
#        yield (title, name), vr['values']

def write_csv(fd, rows, encoding='UTF-8', dialect='excel'):
    csvfile = csv.writer(fd, dialect=dialect)
    for r in rows:
        csvfile.writerow([c for c in r])

# def export_csv(docid, filename_template='%(title)s - %(sheet)s.csv'):
def export_csv(docid, filename_template='%(savepath)s%(sheet)s.csv'):
    for (doc, sheet), rows in itersheets(docid):
        # filename = filename_template % {'title': doc, 'sheet': sheet}
        filename = filename_template % {'savepath': savepath,'sheet': sheet}
        with open(filename, 'w') as fd:
            write_csv(fd, rows)
creds = get_credentials(['https://www.googleapis.com/auth/spreadsheets.readonly'])
service = build('sheets', version='v4', credentials=creds)

if(__name__ == '__main__'):
    for sht in SHEETS:
        export_csv(sht)
    #export_csv(SHEET)
