from django import forms
from django.forms.utils import flatatt
from django.template.loader import render_to_string
from django.utils.safestring import mark_safe
from django.forms.renderers import get_default_renderer


class JSPath:
    def __html__(self):
        return (
            f'<script type="text/javascript" src="https://unpkg.com/trix@2.0.8/dist/trix.umd.min.js"></script>'
        )


class JSCode:
    def __html__(self):
        return (
            """
            <script type="text/javascript" src="{% static "templates/js/trix.js" %}">
                
            </script>
            """
        )


class CSSPath:
    def __html__(self):
        return (
            f'<link rel="stylesheet" href="https://unpkg.com/trix@2.0.8/dist/trix.css">'
        )


class CSSAdminCode:
    def __html__(self):
        return (
            """
            <style>
                .flex-container:has(trix-editor) {
                    display: block;
                }
                trix-toolbar .trix-button {
                    background-color: #d1d1d1 !important;
                }
                trix-editor > h2 {
                    font-size: 1.1em !important;
                    line-height: 1.2;
                    margin: 0;
                }
            </style>
            """
        )


class TrixEditorWidget(forms.Textarea):
    def render(self, name, value, attrs=None, renderer=None):
        attrs = attrs or {}
        attrs['hidden'] = True
        html = super().render(name, value, attrs=attrs, renderer=renderer)
        return mark_safe(f'{html}<trix-editor class="trix-editor" input="{attrs["id"]}"></trix-editor>')

    class Media:
        js = [
            # JSCode(),
            JSPath(),
            "js/trix.js"
        ]
        css = {
            'all': [CSSAdminCode(), CSSPath()],
        }