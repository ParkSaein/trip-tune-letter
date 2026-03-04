import requests
from bs4 import BeautifulSoup
from konlpy.tag import Okt
from collections import Counter
import random

NAVER_URL = "https://news.naver.com/breakingnews/section/103/237"

def get_news_links(max_news=5):
    res = requests.get(NAVER_URL)
    soup = BeautifulSoup(res.text, "html.parser")

    links = []
    for a in soup.select("a.cluster_text_headline"):
        href = a.get("href")
        if href and "news.naver.com" in href:
            links.append(href)
        if len(links) >= max_news:
            break
    return links


def get_content(url):
    res = requests.get(url)
    soup = BeautifulSoup(res.text, "html.parser")
    content = soup.select_one("#articleBodyContents")

    if content:
        return content.get_text(strip=True)
    return ""


def summarize(text, n=3):
    sentences = text.split(". ")
    return ". ".join(sentences[:n])


def extract_keywords(text, top_n=5):
    okt = Okt()
    nouns = okt.nouns(text)
    count = Counter(nouns)
    return [k for k, v in count.most_common(top_n)]


def recommend_music(keywords):
    music_db = {
        "여행": [
            {"title": "여행을 떠나요", "artist": "임창정", "youtube": "https://www.youtube.com/results?search_query=여행을+떠나요"},
            {"title": "떠나자", "artist": "박효신", "youtube": "https://www.youtube.com/results?search_query=떠나자+박효신"},
        ],
        "바다": [
            {"title": "바다의 노래", "artist": "이문세", "youtube": "https://www.youtube.com/results?search_query=바다의+노래"},
        ],
    }

    result = []
    for kw in keywords:
        if kw in music_db:
            result.extend(music_db[kw])

    return result[:3]


def generate_newsletters():
    links = get_news_links()
    newsletters = []

    for link in links[:3]:
        content = get_content(link)
        if not content:
            continue

        summary = summarize(content)
        keywords = extract_keywords(content)
        music = recommend_music(keywords)

        newsletters.append({
            "sourceUrl": link,
            "summary": summary,
            "keywords": keywords,
            "musicRecommendations": music
        })

    return newsletters