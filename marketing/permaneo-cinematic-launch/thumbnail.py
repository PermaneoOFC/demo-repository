from render import *
f=Film();im=f.base(10)
text(im,'INFORMAÇÃO QUE VIRA CUIDADO',85,221,24,MINT,False)
for i,line in enumerate(['Toda trajetória','merece','continuar.']):text(im,line,85,310+i*110,100,MINT if i==2 else WHITE)
text(im,'Conheça o Permaneo.',88,710,36,WHITE,False)
text(im,'Acompanhamento escolar com atenção às pessoas.',88,775,24,MUTED,False)
window(im,f.shots['carometro'],(920,220,920,600),crop=(260,60,1425,820),chrome=True)
window(im,f.shots['frequency'],(1070,690,750,300),crop=(300,280,1385,710),chrome=True)
im.convert('RGB').save(R/'deliverables/permaneo-thumbnail.png')
