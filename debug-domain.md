# Domain Routing Debug

## Het probleem
- aggregaatkopen.com → 301 redirect loop
- Bestanden staan correct op Vimexx server
- FTP werkt perfect met ftp.aggregaatkopen.com

## Mogelijke oorzaken
1. **GenSpark routing** - Domain wijst niet direct naar Vimexx
2. **Vimexx configuratie** - Domain niet correct gekoppeld
3. **DNS propagatie** - Recente wijzigingen nog niet doorgevoerd

## Te checken in Vimexx Control Panel
- [ ] Domein aggregaatkopen.com toegevoegd als hoofddomein?
- [ ] DNS A-record wijst naar juiste IP?
- [ ] CNAME records correct?
- [ ] SSL certificaat actief?

## Te checken in GenSpark
- [ ] Domain DNS settings
- [ ] Proxy/CDN uitgeschakeld
- [ ] Direct routing naar Vimexx IP

## Volgende stappen
1. Vimexx control panel → Domain settings
2. Zoek aggregaatkopen.com configuratie  
3. Check of het als "Addon Domain" of "Main Domain" staat
4. Verifieer DNS instellingen