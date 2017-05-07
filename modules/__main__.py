import random
import nltk
from PyDictionary import PyDictionary
import json
from watson_developer_cloud import ToneAnalyzerV3


def main(data):
    s=data["text"]
    p = pos(s)
    cur_score  = data["score"]
    for item in p:
        if item[1] == 'JJ' or item[1] == 'RB':
            syn = PyDictionary.synonym(item[0])
            # cnt = 0;
#             cal_times = random.randint(0,3)
#             while cnt < cal_times:
            pick = syn[random.randint(0, len(syn)-1)]
          #     print item[0],pick
            s_tmp = s.replace(str(item[0]).strip(""), str(pick).strip(""))
            tmp_score = w_score(s_tmp)
            if tmp_score < cur_score:
                s = s_tmp
                cur_score = tmp_score
#                 cnt += 1
                
    return {"data":s}  
#     print s


def w_score(s):
    
    tone_analyzer = ToneAnalyzerV3(
        username="d1bbdc36-a325-4fad-bda2-ad180c9619ea",
        password="0yExAEh3NExP",
        version='2017-05-05 ')

    demo = tone_analyzer.tone(text = s)

    anger = (demo["document_tone"]["tone_categories"][0]["tones"][0])['score']
    disgust = (demo["document_tone"]["tone_categories"][0]["tones"][1])['score']
    fear = (demo["document_tone"]["tone_categories"][0]["tones"][2])['score']
    sadness = (demo["document_tone"]["tone_categories"][0]["tones"][4])['score']

    avg = (anger + disgust + fear + sadness)/4

    return avg
    

def pos(s):
    tokens = nltk.word_tokenize(s)
    pos = nltk.pos_tag(tokens)
    return pos
    
