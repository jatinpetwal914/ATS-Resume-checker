"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTextPositions = findTextPositions;
exports.findAllTextPositions = findAllTextPositions;
exports.findUnparsableCharacters = findUnparsableCharacters;
exports.findWeakActionVerbs = findWeakActionVerbs;
exports.extractLines = extractLines;
exports.getCharPositionFromLineCol = getCharPositionFromLineCol;
exports.getLineColFromCharPosition = getLineColFromCharPosition;
/**
 * Find all positions of a phrase in text (case-insensitive)
 */
function findTextPositions(text, phrase) {
    const positions = [];
    const lowerText = text.toLowerCase();
    const lowerPhrase = phrase.toLowerCase();
    let startIndex = 0;
    while (true) {
        const index = lowerText.indexOf(lowerPhrase, startIndex);
        if (index === -1)
            break;
        const endIndex = index + phrase.length;
        const lineNumber = text.substring(0, index).split('\n').length;
        positions.push({
            phrase,
            startIndex: index,
            endIndex,
            lineNumber,
            confidence: 0.95,
        });
        startIndex = index + 1;
    }
    return positions;
}
/**
 * Find positions of multiple phrases
 */
function findAllTextPositions(text, phrases) {
    const allPositions = [];
    phrases.forEach(phrase => {
        const positions = findTextPositions(text, phrase);
        allPositions.push(...positions);
    });
    // Sort by position
    allPositions.sort((a, b) => a.startIndex - b.startIndex);
    return allPositions;
}
/**
 * Find unparsable characters (non-standard characters that ATS might struggle with)
 */
function findUnparsableCharacters(text) {
    const positions = [];
    const unparsablePattern = /[®™©§¶†‡•★○●◐◑▲▼◄►✓✗✓❌🔥💡]/g;
    let match;
    const regex = new RegExp(unparsablePattern);
    while ((match = regex.exec(text)) !== null) {
        const lineNumber = text.substring(0, match.index).split('\n').length;
        positions.push({
            phrase: match[0],
            startIndex: match.index,
            endIndex: match.index + match[0].length,
            lineNumber,
            confidence: 1.0,
        });
    }
    return positions;
}
/**
 * Find weak action verbs that should be replaced with stronger ones
 */
function findWeakActionVerbs(text) {
    const weakVerbs = ['responsible for', 'involved in', 'helped', 'worked on', 'did'];
    return findAllTextPositions(text, weakVerbs);
}
/**
 * Extract lines from text
 */
function extractLines(text) {
    return text.split('\n').filter(line => line.trim().length > 0);
}
/**
 * Get character position from line and column
 */
function getCharPositionFromLineCol(text, line, col) {
    const lines = text.split('\n');
    let position = 0;
    for (let i = 0; i < line - 1; i++) {
        position += (lines[i] || '').length + 1; // +1 for newline
    }
    position += col;
    return position;
}
/**
 * Get line and column from character position
 */
function getLineColFromCharPosition(text, charPos) {
    const lines = text.split('\n');
    let currentPos = 0;
    for (let i = 0; i < lines.length; i++) {
        const lineLength = lines[i].length + 1; // +1 for newline
        if (currentPos + lineLength > charPos) {
            return {
                line: i + 1,
                col: charPos - currentPos,
            };
        }
        currentPos += lineLength;
    }
    return { line: lines.length, col: lines[lines.length - 1].length };
}
